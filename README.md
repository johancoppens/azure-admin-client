# azure-admin-client

azure-admin-client is a module with the aim of making it easier to manage users and groups in Azure Active Directory in [Node.js](https://nodejs.org/). It is a wrapper around the official [microsoft-graph-client](https://www.npmjs.com/package/@microsoft/microsoft-graph-client).

## Installation

```bash
$ npm install --save github:johancoppens/azure-admin-client
```

## Usage

```javascript
const azAdmin = require('./index')

// Zie README_AZURE_CONFIG.md voor configuratie Azure Active Directory
const conf = {
  tenantId: '<tenantId>',
  clientId: '<clientId>',
  clientSecret: '<clientSecret>'
}

const jane = {
  firstName: 'Jane',
  lastName: 'Roe',
  userPrincipalName: 'jane.roe@example.com',
  mail: 'jane.roe@example.com',
  password: 'Pa55word'
}

await azAdmin.init(conf)

const user = await azAdmin.createUser(jane)

console.log(user) // >> newly created user

```

## Azure Configuration

Here: [README_AZURE_CONFIG.md](README_AZURE_CONFIG.md)

## Docs

Here: [api.md](api.md)

## Run Tests

Eerst Azure configureren en config.js aanmaken!

```bash
$ npm test

```

## Examples

See: [test.js](test.js)
