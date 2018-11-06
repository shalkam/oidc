const Provider = require('oidc-provider');

const adapter = require('./adapter');

const { AdapterTest } = Provider;

const provider = new Provider('http://localhost');
const test = new AdapterTest(provider);
console.log(test)
provider.initialize({ adapter })
  .then(() => test.execute())
  .then(() => {
    console.log('tests passed');
    process.exit();
  })
  .catch((err) => {
    console.dir(err);
    process.exit(1);
  });