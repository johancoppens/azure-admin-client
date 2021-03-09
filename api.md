<a name="module_azure-admin-client"></a>

## azure-admin-client
azure-admin-client is a module with the aim of making it easier to manage users and groups in Azure Active Directory with [Node.js](https://nodejs.org/)


* [azure-admin-client](#module_azure-admin-client)
    * [.AzureAdminClientError](#module_azure-admin-client.AzureAdminClientError)
        * [new AzureAdminClientError(message)](#new_module_azure-admin-client.AzureAdminClientError_new)
    * [.AzureAdminServiceError](#module_azure-admin-client.AzureAdminServiceError)
        * [new AzureAdminServiceError(message)](#new_module_azure-admin-client.AzureAdminServiceError_new)
    * [.init(options)](#module_azure-admin-client.init)
    * [.getUser(options)](#module_azure-admin-client.getUser) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createUser(options)](#module_azure-admin-client.createUser) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateUser(options)](#module_azure-admin-client.updateUser) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.deleteUser(options)](#module_azure-admin-client.deleteUser) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.updateUserPassword(options)](#module_azure-admin-client.updateUserPassword) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setUserStateInactive(options)](#module_azure-admin-client.setUserStateInactive) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.setUserStateActive(options)](#module_azure-admin-client.setUserStateActive) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getAllUsers(options)](#module_azure-admin-client.getAllUsers) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getGroup(options)](#module_azure-admin-client.getGroup) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createGroup(options)](#module_azure-admin-client.createGroup) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateGroup(options)](#module_azure-admin-client.updateGroup) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.deleteGroup(options)](#module_azure-admin-client.deleteGroup) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.addUserToGroup(options)](#module_azure-admin-client.addUserToGroup) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.removeUserFromGroup(options)](#module_azure-admin-client.removeUserFromGroup) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.addGroupToGroup(options)](#module_azure-admin-client.addGroupToGroup) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.removeGroupFromGroup(options)](#module_azure-admin-client.removeGroupFromGroup) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getUsersByGroup(options)](#module_azure-admin-client.getUsersByGroup) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="module_azure-admin-client.AzureAdminClientError"></a>

### azure-admin-client.AzureAdminClientError
MsdminClientError

**Kind**: static class of [<code>azure-admin-client</code>](#module_azure-admin-client)  
<a name="new_module_azure-admin-client.AzureAdminClientError_new"></a>

#### new AzureAdminClientError(message)
Constructor


| Param | Type |
| --- | --- |
| message | <code>string</code> | 

<a name="module_azure-admin-client.AzureAdminServiceError"></a>

### azure-admin-client.AzureAdminServiceError
AzureAdminServiceError

**Kind**: static class of [<code>azure-admin-client</code>](#module_azure-admin-client)  
<a name="new_module_azure-admin-client.AzureAdminServiceError_new"></a>

#### new AzureAdminServiceError(message)
Constructor


| Param | Type |
| --- | --- |
| message | <code>string</code> | 

<a name="module_azure-admin-client.init"></a>

### azure-admin-client.init(options)
Initialize azure-admin-client API module

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.tenantId | <code>string</code> |  |
| options.clientId | <code>string</code> |  |
| options.clientSecret | <code>string</code> | Note: See README_AZURE_CONFIG.md on how to set up you Azure to work with this client |

<a name="module_azure-admin-client.getUser"></a>

### azure-admin-client.getUser(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves a user

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The user or null when not found  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | User's id or userPrincipalName |

<a name="module_azure-admin-client.createUser"></a>

### azure-admin-client.createUser(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a user in Azure Active Directory

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The newly created user  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.firstName | <code>string</code> |  |  |
| options.lastName | <code>string</code> |  |  |
| options.userPrincipalName | <code>string</code> |  |  |
| options.password | <code>string</code> |  |  |
| [options.changePasswordAtNextLogin] | <code>boolean</code> | <code>true</code> |  |
| [options.mail] | <code>string</code> | <code>null</code> |  |
| [options.accountEnabled] | <code>boolean</code> | <code>true</code> |  |
| [options.preferredLanguage] | <code>string</code> | <code>&quot;&#x27;nl&#x27;&quot;</code> |  |
| [options.passwordPolicies] | <code>string</code> | <code>&quot;&#x27;DisablePasswordExpiration&#x27;&quot;</code> | Can be one of "DisablePasswordExpiration, DisableStrongPassword" or both. |
| [options.usageLocation] | <code>string</code> | <code>&quot;&#x27;BE&#x27;&quot;</code> | I think this is required for assigning licenses |

<a name="module_azure-admin-client.updateUser"></a>

### azure-admin-client.updateUser(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Updates a user. This is a generic method to update a user

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | User's id or userPrincipalName |
| options.user | <code>string</code> | An object with the values for relevant fields that should be updated. See https://docs.microsoft.com/en-us/graph/api/user-update |

<a name="module_azure-admin-client.deleteUser"></a>

### azure-admin-client.deleteUser(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Deletes a user.
When deleted, user resources are moved to a temporary container and can be restored within 30 days. After that time, they are permanently deleted

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | User's id or userPrincipalName |

<a name="module_azure-admin-client.updateUserPassword"></a>

### azure-admin-client.updateUserPassword(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Updates a user's password

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True on success  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.userKey | <code>string</code> |  | User's id or userPrincipalName |
| options.newPassword | <code>string</code> |  |  |
| [options.changePasswordAtNextLogin] | <code>string</code> | <code>true</code> |  |

<a name="module_azure-admin-client.setUserStateInactive"></a>

### azure-admin-client.setUserStateInactive(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Disables a user account

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | User's id or userPrincipalName |

<a name="module_azure-admin-client.setUserStateActive"></a>

### azure-admin-client.setUserStateActive(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
(Re)enables a user account

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.userKey | <code>string</code> | User's id or userPrincipalName |

<a name="module_azure-admin-client.getAllUsers"></a>

### azure-admin-client.getAllUsers(options) ⇒ <code>Promise.&lt;Array&gt;</code>
Get all users

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.parentGroupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

<a name="module_azure-admin-client.getGroup"></a>

### azure-admin-client.getGroup(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Retrieves a group's properties.

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Group resource or null when not found  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

<a name="module_azure-admin-client.createGroup"></a>

### azure-admin-client.createGroup(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a group
Note: Duplicate groupes with same name ara allowed

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The newly created group  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| options.displayName | <code>string</code> |  | 
| [options.description] | <code>string</code> |  | 
| [options.mailEnabled] | <code>boolean</code> | <code>false</code> | 
| [options.mailNickname] | <code>string</code> |  | 
| [options.securityEnabled] | <code>string</code> | <code>true</code> | 

<a name="module_azure-admin-client.updateGroup"></a>

### azure-admin-client.updateGroup(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Updates a group. This is a generic method to update a user

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| options.group | <code>string</code> | An object with the values for relevant fields that should be updated. See https://docs.microsoft.com/en-us/graph/api/group-update |

<a name="module_azure-admin-client.deleteGroup"></a>

### azure-admin-client.deleteGroup(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Deletes a group.

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True on success  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

<a name="module_azure-admin-client.addUserToGroup"></a>

### azure-admin-client.addUserToGroup(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Adds a user to group

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| options.userId | <code>string</code> | The users's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

<a name="module_azure-admin-client.removeUserFromGroup"></a>

### azure-admin-client.removeUserFromGroup(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Removes a user from group

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| options.userId | <code>string</code> | The users's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

<a name="module_azure-admin-client.addGroupToGroup"></a>

### azure-admin-client.addGroupToGroup(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Adds a group to group

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.parentGroupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| options.childGroupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

<a name="module_azure-admin-client.removeGroupFromGroup"></a>

### azure-admin-client.removeGroupFromGroup(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Removes a group from group

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.parentGroupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |
| options.childGroupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

<a name="module_azure-admin-client.getUsersByGroup"></a>

### azure-admin-client.getUsersByGroup(options) ⇒ <code>Promise.&lt;Array&gt;</code>
Get users by group

**Kind**: static method of [<code>azure-admin-client</code>](#module_azure-admin-client)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.groupId | <code>string</code> | The group's id, in the form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

