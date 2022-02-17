/**
 * azure-admin-client is a module with the aim of making it easier to manage users and groups in Azure Active Directory with [Node.js](https://nodejs.org/)
 * @module azure-admin-client
 */

const qs = require('qs')
require('isomorphic-fetch')
const axios = require('axios')
const { Client } = require('@microsoft/microsoft-graph-client')

module.exports = (function () {
  let _initialized = false
  const _config = {
    tenantId: null,
    clientId: null,
    clientSecret: null
  }

  let _client = null

  // PUBLIC API
  /**
  * Initialize azure-admin-client API module
  * @memberof module:azure-admin-client
  * @param {object} options
  * @param {string} options.tenantId
  * @param {string} options.clientId
  * @param {string} options.clientSecret
  *
  * Note: See README_AZURE_CONFIG.md on how to set up you Azure to work with this client
  */
  const init = async ({
    tenantId = r(),
    clientId = r(),
    clientSecret = r()
  } = {}) => {
    _config.tenantId = tenantId
    _config.clientId = clientId
    _config.clientSecret = clientSecret
    try {
      _client = Client.initWithMiddleware({
        defaultVersion: 'v1.0',
        debugLogging: false,
        authProvider: new CredentialProvider(_config)
      })
      _initialized = true
    } catch (e) {
      throw new AzureAdminClientError(e.message)
    }
    return true
  }

  /**
   * Retrieves a user
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.userKey User's id or userPrincipalName
   * @returns {Promise<Object>} The user or null when not found
   */
  const getUser = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    try {
      const res = await _client.api(`/users/${userKey}`)
        .get()
      return res
    } catch (e) {
      if (e.statusCode === 404) return null // not found
      throw new AzureAdminServiceError(e)
    }
  }

  /**
   * Creates a user in Azure Active Directory
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.firstName
   * @param {string} options.lastName
   * @param {string} options.displayName
   * @param {string} options.userPrincipalName
   * @param {string} options.password
   * @param {boolean} [options.changePasswordAtNextLogin = true]
   * @param {string} [options.mail = null]
   * @param {boolean} [options.accountEnabled = true]
   * @param {string} [options.preferredLanguage = 'nl']
   * @param {string} [options.passwordPolicies = 'DisablePasswordExpiration'] Can be one of "DisablePasswordExpiration, DisableStrongPassword" or both.
   * @param {string} [options.usageLocation = 'BE'] I think this is required for assigning licenses
   * @returns {Promise<Object>} The newly created user
   */
  const createUser = async ({
    firstName = r(),
    lastName = r(),
    displayName = null,
    userPrincipalName = r(),
    password = r(),
    changePasswordAtNextLogin = true,
    mail = null,
    accountEnabled = true,
    preferredLanguage = 'nl',
    passwordPolicies = 'DisablePasswordExpiration',
    usageLocation = 'BE'
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    const user = {
      displayName: displayName !== null ? displayName : `${firstName} ${lastName}`,
      givenName: firstName,
      surname: lastName,
      userPrincipalName: userPrincipalName,
      mailNickname: userPrincipalName.split('@')[0],
      passwordProfile: {
        forceChangePasswordNextSignIn: changePasswordAtNextLogin,
        password: password
      },
      mail: mail,
      accountEnabled: accountEnabled,
      preferredLanguage: preferredLanguage,
      passwordPolicies: passwordPolicies,
      usageLocation: usageLocation
    }
    try {
      const res = await _client.api('/users')
        .post(user)
      return res
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Updates a user. This is a generic method to update a user
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.userKey User's id or userPrincipalName
   * @param {string} options.user An object with the values for relevant fields that should be updated. See https://docs.microsoft.com/en-us/graph/api/user-update
   * @returns {Promise<boolean>} True on success
   */
  const updateUser = async ({
    userKey = r(),
    user = r()
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    try {
      await _client.api(`/users/${userKey}`)
        .patch(user)
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Deletes a user.
   * When deleted, user resources are moved to a temporary container and can be restored within 30 days. After that time, they are permanently deleted
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.userKey User's id or userPrincipalName
   * @returns {Promise<boolean>} True on success
   */
  const deleteUser = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    try {
      await _client.api(`/users/${userKey}`)
        .delete()
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err)
    }
  }

  /**
   * Updates a user's password
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.userKey User's id or userPrincipalName
   * @param {string} options.newPassword
   * @param {string} [options.changePasswordAtNextLogin = true]
   * @returns {Promise<boolean>} True on success
   */
  const updateUserPassword = async ({
    userKey = r(),
    newPassword = r(),
    changePasswordAtNextLogin = true
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    const user = {
      passwordProfile: {
        forceChangePasswordNextSignIn: changePasswordAtNextLogin,
        password: newPassword
      }
    }
    try {
      await _client.api(`/users/${userKey}`)
        .patch(user)
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Disables a user account
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.userKey User's id or userPrincipalName
   * @returns {Promise<boolean>} True on success
   */
  const setUserStateInactive = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    const user = {
      accountEnabled: false
    }
    try {
      await _client.api(`/users/${userKey}`)
        .patch(user)
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * (Re)enables a user account
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.userKey User's id or userPrincipalName
   * @returns {Promise<boolean>} True on success
   */
  const setUserStateActive = async ({
    userKey = r()
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    const user = {
      accountEnabled: true
    }
    try {
      await _client.api(`/users/${userKey}`)
        .patch(user)
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Get all users
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.parentGroupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<Array>}
   */
  const getAllUsers = async () => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    try {
      const res = await _client.api('/users')
        .get()
      return res.value
    } catch (e) {
      throw new AzureAdminServiceError(e)
    }
  }

  /**
   * Retrieves a group's properties.
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.groupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<Object>} Group resource or null when not found
   */
  const getGroup = async ({
    groupId
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    try {
      const res = await _client.api(`/groups/${groupId}`)
        .get()
      return res
    } catch (err) {
      // console.log(err)
      // if (err.response.statusCode === 404) return null // not a real error
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Creates a group
   * Note: Duplicate groupes with same name ara allowed
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.displayName
   * @param {string} [options.description]
   * @param {boolean} [options.mailEnabled = false]
   * @param {string} [options.mailNickname]
   * @param {string} [options.securityEnabled = true]
   * @returns {Promise<Object>} The newly created group
   */
  const createGroup = async ({
    displayName = r(),
    description,
    mailEnabled = false,
    mailNickname,
    securityEnabled = true
  } = {}) => {
    if (!_initialized) e('Module g-admin-client not initialized with init()')
    const group = {
      displayName: displayName,
      description: description,
      mailEnabled: mailEnabled,
      mailNickname: mailNickname || displayName.replace(' ', ''),
      securityEnabled: securityEnabled
    }
    try {
      const res = await _client.api('groups')
        .post(group)
      return res
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Updates a group. This is a generic method to update a user
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.groupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @param {string} options.group An object with the values for relevant fields that should be updated. See https://docs.microsoft.com/en-us/graph/api/group-update
   * @returns {Promise<boolean>} True on success
   */
  const updateGroup = async ({
    groupId = r(),
    group = r()
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    try {
      await _client.api(`/groups/${groupId}`)
        .patch(group)
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Deletes a group.
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.groupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<boolean>} True on success
   */
  const deleteGroup = async ({
    groupId = r()
  } = {}) => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    try {
      await _client.api(`/groups/${groupId}`)
        .delete()
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err)
    }
  }

  /**
   * Adds a user to group
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.groupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @param {string} options.userId The users's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<boolean>}
   */
  const addUserToGroup = async ({
    groupId = r(),
    userId = r()
  } = {}) => {
    try {
      await _client.api(`groups/${groupId}/members/$ref`)
        .post({
          '@odata.id': `https://graph.microsoft.com/v1.0/users/${userId}`
        })
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Removes a user from group
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.groupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @param {string} options.userId The users's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<boolean>}
   */
  const removeUserFromGroup = async ({
    groupId = r(),
    userId = r()
  } = {}) => {
    try {
      await _groupRemoveMember({
        groupId: groupId,
        memberId: userId
      })
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Adds a group to group
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.parentGroupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @param {string} options.childGroupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<boolean>}
   */
  const addGroupToGroup = async ({
    parentGroupId = r(),
    childGroupId = r()
  } = {}) => {
    try {
      await _client.api(`groups/${parentGroupId}/members/$ref`)
        .post({
          '@odata.id': `https://graph.microsoft.com/v1.0/groups/${childGroupId}`
        })
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Removes a group from group
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.parentGroupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @param {string} options.childGroupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<boolean>}
   */
  const removeGroupFromGroup = async ({
    parentGroupId = r(),
    childGroupId = r()
  } = {}) => {
    try {
      await _groupRemoveMember({
        groupId: parentGroupId,
        memberId: childGroupId
      })
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Get users by group
   * @memberof module:azure-admin-client
   * @param {object} options
   * @param {string} options.groupId The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   * @returns {Promise<Array>}
   */
  const getUsersByGroup = async ({
    groupId = r()
  } = {}) => {
    try {
      const res = await _client.api(`/groups/${groupId}/members/microsoft.graph.user`)
        .get()
      return res
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  // PRIVATE

  /**
   * Adds a member to group
   */
  // const _groupAddMember = async ({
  //   groupId = r(),
  //   memberId = r()
  // } = {}) => {
  //   try {
  //     await _client.api(`groups/${groupId}/members/$ref`)
  //       .post({
  //         '@odata.id': `https://graph.microsoft.com/v1.0/users/{${memberId}}`
  //       })
  //     return true
  //   } catch (err) {
  //     throw new AzureAdminServiceError(err.message)
  //   }
  // }

  /**
   * Removes a member from group
   */
  const _groupRemoveMember = async ({
    groupId = r(),
    memberId = r()
  } = {}) => {
    try {
      await _client.api(`groups/${groupId}/members/${memberId}/$ref`)
        .delete()
      return true
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  /**
   * Get raw client
   * @memberof module:azure-admin-client
   * @returns {Promise<boolean>}
   */
  const getClient = async () => {
    if (!_initialized) e('Module azure-admin-client not initialized with init()')
    try {
      return _client
    } catch (err) {
      throw new AzureAdminServiceError(err.message)
    }
  }

  class CredentialProvider {
    constructor (conf) {
      this.conf = conf
    }

    async getAccessToken () {
      const url = 'https://login.microsoftonline.com/' + this.conf.tenantId + '/oauth2/v2.0/token';
      const body = {
        client_id: this.conf.clientId,
        client_secret: this.conf.clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials'
      }
      try {
        const response = await axios.post(url, qs.stringify(body))
        if (response.status === 200) {
          return response.data.access_token
        } else {
          throw new Error('Non 200OK response on obtaining token...')
        }
      } catch (error) {
        throw new Error('Error on obtaining token...')
      }
    }
  }

  /**
   * MsdminClientError
   * @class
   * @memberof module:azure-admin-client
   */
  class AzureAdminClientError extends Error {
    /**
     * Constructor
     * @param {string} message
     */
    constructor (message) {
      super(message)
      this.name = 'AzureAdminClientError'
    }
  }

  /**
   * AzureAdminServiceError
   * @class
   * @memberof module:azure-admin-client
   */
  class AzureAdminServiceError extends Error {
    /**
     * Constructor
     * @param {string} message
     */
    constructor (message, statusCode) {
      super(message)
      this.name = 'AzureAdminServiceError'
      this.statusCode = statusCode
    }
  }

  // Utility shortcut functions
  // Parameter error func used if parameter is required
  const r = () => {
    e('Vereiste parameter is niet opgegeven')
  }
  // Shortcut for throwing a azure-admin-client error
  const e = (message) => {
    throw new AzureAdminClientError(message)
  }

  // Expose public API
  return {
    init,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserPassword,
    setUserStateInactive,
    setUserStateActive,
    getAllUsers,
    getUsersByGroup,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup,
    addUserToGroup,
    removeUserFromGroup,
    addGroupToGroup,
    removeGroupFromGroup,
    getClient,
    AzureAdminServiceError
  }
}())
