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