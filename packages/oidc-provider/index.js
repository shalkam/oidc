require('dotenv').config()
const myAdapter = require('./db/adapter');

const Provider = require('oidc-provider');
const configuration = {
  // ... see available options /docs/configuration.md
  features: {
    clientCredentials: true,
    introspection: true
  },
  async findById(ctx, id) {
    return {
      accountId: id,
      async claims(use, scope) { return { sub: id }; },
    };
  }
};
const clients = [{
    client_id: 'test_implicit_app',
    grant_types: ['authorization_code'],
    response_types: ['code'],
    redirect_uris: ['https://127.0.0.1:3001/signin-oidc', 'https://127.0.0.1:3001/dashboard'],
    token_endpoint_auth_method: 'none'
}];

const oidc = new Provider('http://localhost:3000', configuration);

let server;
(async () => {
  await oidc.initialize({ clients, adapter: myAdapter });
  // express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
  oidc.callback

  // koa application for use with koa apps, see /examples/koa.js
  oidc.app

  // or just expose a server standalone, see /examples/standalone.js
  server = oidc.listen(3000, () => {
    console.log('oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration');
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});