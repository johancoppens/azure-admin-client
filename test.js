const chai = require('chai')

const azAdmin = require('./index')
const conf = require('./config')

const testData = {
  users: {
    jane: {
      firstName: 'Jane',
      lastName: 'Roe',
      userPrincipalName: 'jane.roe@lln.edugolo.be',
      mail: 'jane.roe@lln.edugolo.be',
      password: 'Pa55word'
    },
    john: {
      firstName: 'John',
      lastName: 'Doe',
      userPrincipalName: 'john.doe@lln.edugolo.be',
      mail: 'john.doe@lln.edugolo.be',
      password: 'Pa55word'
    }
  },
  groups: {
    demo1: {
      displayName: 'demo 1',
      description: 'Demo Group 1'
    },
    demo2: {
      displayName: 'demo 2',
      description: 'Demo Group 2'
    }
  }
}

describe('azure-admin-client tests', () => {
  it('It should initialize', async () => {
    await azAdmin.init(conf)
  })

  it('It should create the user jane', async () => {
    const user = await azAdmin.createUser(testData.users.jane)
    // Store id for later tests
    testData.users.jane.id = user.id
    chai.expect(user.userPrincipalName).to.be.eq(testData.users.jane.userPrincipalName)
  })

  it('It should throw an AzureAdminServiceError for duplicate user jane', async () => {
    try {
      await azAdmin.createUser(testData.users.jane)
    } catch(e) {
      chai.expect(e instanceof azAdmin.AzureAdminServiceError).to.be.eql(true)
    }
  })

  it('It should get the user jane by userPrincipalName', async () => {
    const user = await azAdmin.getUser({ userKey: testData.users.jane.userPrincipalName })
    chai.expect(user.userPrincipalName).to.be.eq(testData.users.jane.userPrincipalName)
  })

  it('It should get the user jane by id', async () => {
    const user = await azAdmin.getUser({ userKey: testData.users.jane.id })
    chai.expect(user.id).to.be.eq(testData.users.jane.id)
  })

  it('It should delete the user jane by userPrincipalName', async () => {
    await azAdmin.deleteUser({ userKey: testData.users.jane.userPrincipalName })
  })

  it('It should delete the user jane by id', async () => {
    // Recreate user jane
    const user = await azAdmin.createUser(testData.users.jane)
    // Store id for later tests
    testData.users.jane.id = user.id
    await azAdmin.deleteUser({ userKey: testData.users.jane.id })
  })

  it('It should update the givenName of jane to Jany', async () => {
    // Recreate user jane
    let user = await azAdmin.createUser(testData.users.jane)
    // Store id for later tests
    testData.users.jane.id = user.id
    await azAdmin.updateUser({
      userKey: testData.users.jane.userPrincipalName,
      user: {
        givenName: 'Jany'
      }
    })
    user = await azAdmin.getUser({ userKey: testData.users.jane.userPrincipalName })
    chai.expect(user.givenName).to.be.eq('Jany')
  })

  it('It should create groups demo1 and demo2', async () => {
    const g1 = await azAdmin.createGroup(testData.groups.demo1)
    testData.groups.demo1.id = g1.id
    chai.expect(g1.displayName).to.be.eq(testData.groups.demo1.displayName)
    const g2 = await azAdmin.createGroup(testData.groups.demo2)
    testData.groups.demo2.id = g2.id
    chai.expect(g2.displayName).to.be.eq(testData.groups.demo2.displayName)
  })

  it('It should add jane to group demo2', async () => {
    await azAdmin.addUserToGroup({
      groupId: testData.groups.demo2.id,
      userId: testData.users.jane.id
    })
  })

  it('It should add demo2 group to group demo1', async () => {
    await azAdmin.addGroupToGroup({
      parentGroupId: testData.groups.demo1.id,
      childGroupId: testData.groups.demo2.id
    })
  })

  it('It should delete groups demo1 and demo2', async () => {
    await azAdmin.deleteGroup({ groupId: testData.groups.demo2.id })
    await azAdmin.deleteGroup({ groupId: testData.groups.demo1.id })
  })

  it('It should delete the user jane by userPrincipalName', async () => {
    await azAdmin.deleteUser({ userKey: testData.users.jane.userPrincipalName })
  })
})
