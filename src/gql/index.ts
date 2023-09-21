import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Duration: { input: any; output: any }
  Time: { input: any; output: any }
}

export type AndFunctions = {
  __typename?: 'AndFunctions'
  and: Array<Function>
}

export type AndFunctionsOrPlaintext = AndFunctions | Plaintext

export type Config = {
  __typename?: 'Config'
  global: Global
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  selected: Scalars['Boolean']['output']
}

export type ConfigFlatDesc = {
  __typename?: 'ConfigFlatDesc'
  defaultValue: Scalars['String']['output']
  desc: Scalars['String']['output']
  isArray: Scalars['Boolean']['output']
  mapping: Scalars['String']['output']
  name: Scalars['String']['output']
  required: Scalars['Boolean']['output']
  type: Scalars['String']['output']
}

export type Dae = {
  __typename?: 'Dae'
  /** modified indicates whether the running config has been modified. */
  modified: Scalars['Boolean']['output']
  running: Scalars['Boolean']['output']
  version: Scalars['String']['output']
}

export type DaeDns = {
  __typename?: 'DaeDns'
  routing: DnsRouting
  string: Scalars['String']['output']
  upstream: Array<Param>
}

export type DaeRouting = {
  __typename?: 'DaeRouting'
  fallback: FunctionOrPlaintext
  rules: Array<RoutingRule>
  string: Scalars['String']['output']
}

export type DefaultRoute = {
  __typename?: 'DefaultRoute'
  gateway?: Maybe<Scalars['String']['output']>
  ipVersion: Scalars['String']['output']
  source?: Maybe<Scalars['String']['output']>
}

export type Dns = {
  __typename?: 'Dns'
  dns: DaeDns
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  selected: Scalars['Boolean']['output']
}

export type DnsRouting = {
  __typename?: 'DnsRouting'
  request: DaeRouting
  response: DaeRouting
}

export type Function = {
  __typename?: 'Function'
  name: Scalars['String']['output']
  not: Scalars['Boolean']['output']
  params: Array<Param>
}

export type FunctionOrPlaintext = Function | Plaintext

export type General = {
  __typename?: 'General'
  dae: Dae
  interfaces: Array<Interface>
  schema: Scalars['String']['output']
}

export type GeneralInterfacesArgs = {
  up?: InputMaybe<Scalars['Boolean']['input']>
}

export type Global = {
  __typename?: 'Global'
  allowInsecure: Scalars['Boolean']['output']
  autoConfigKernelParameter: Scalars['Boolean']['output']
  checkInterval: Scalars['Duration']['output']
  checkTolerance: Scalars['Duration']['output']
  dialMode: Scalars['String']['output']
  disableWaitingNetwork: Scalars['Boolean']['output']
  lanInterface: Array<Scalars['String']['output']>
  logLevel: Scalars['String']['output']
  sniffingTimeout: Scalars['Duration']['output']
  soMarkFromDae: Scalars['Int']['output']
  tcpCheckHttpMethod: Scalars['String']['output']
  tcpCheckUrl: Array<Scalars['String']['output']>
  tlsImplementation: Scalars['String']['output']
  tproxyPort: Scalars['Int']['output']
  tproxyPortProtect: Scalars['Boolean']['output']
  udpCheckDns: Array<Scalars['String']['output']>
  utlsImitate: Scalars['String']['output']
  wanInterface: Array<Scalars['String']['output']>
}

export type Group = {
  __typename?: 'Group'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  nodes: Array<Node>
  policy: Policy
  policyParams: Array<Param>
  subscriptions: Array<Subscription>
}

export type ImportArgument = {
  link: Scalars['String']['input']
  tag?: InputMaybe<Scalars['String']['input']>
}

export type Interface = {
  __typename?: 'Interface'
  flag: InterfaceFlag
  ifindex: Scalars['Int']['output']
  ip: Array<Scalars['String']['output']>
  name: Scalars['String']['output']
}

export type InterfaceIpArgs = {
  onlyGlobalScope?: InputMaybe<Scalars['Boolean']['input']>
}

export type InterfaceFlag = {
  __typename?: 'InterfaceFlag'
  default?: Maybe<Array<DefaultRoute>>
  up: Scalars['Boolean']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** createConfig creates a global config. Null arguments will be converted to default value. */
  createConfig: Config
  /** createConfig creates a dns config. Null arguments will be converted to default value. */
  createDns: Dns
  /** createGroup is to create a group. */
  createGroup: Group
  /** createConfig creates a routing config. Null arguments will be converted to default value. */
  createRouting: Routing
  /** createUser creates a user if there is no user. */
  createUser: Scalars['String']['output']
  /** groupAddNodes is to add nodes to the group. Nodes will not be removed from its subscription when subscription update. */
  groupAddNodes: Scalars['Int']['output']
  /** groupAddSubscriptions is to add subscriptions to the group. */
  groupAddSubscriptions: Scalars['Int']['output']
  /** groupDelNodes is to remove nodes from the group. */
  groupDelNodes: Scalars['Int']['output']
  /** groupDelSubscriptions is to remove subscriptions from the group. */
  groupDelSubscriptions: Scalars['Int']['output']
  /** groupSetPolicy is to set the group a new policy. */
  groupSetPolicy: Scalars['Int']['output']
  /** importNodes is to import nodes with no subscription ID. rollbackError means abort the import on error. */
  importNodes: Array<NodeImportResult>
  /** importSubscription is to fetch and resolve the subscription into nodes. */
  importSubscription: SubscriptionImportResult
  /** removeConfig is to remove a config with given config ID. */
  removeConfig: Scalars['Int']['output']
  /** removeDns is to remove a dns config with given dns ID. */
  removeDns: Scalars['Int']['output']
  /** removeGroup is to remove a group. */
  removeGroup: Scalars['Int']['output']
  /** removeJsonStorage remove given paths from user related json storage. Empty paths is to clear json storage. Refer to https://github.com/tidwall/sjson */
  removeJsonStorage: Scalars['Int']['output']
  /** removeNodes is to remove nodes that have no subscription ID. */
  removeNodes: Scalars['Int']['output']
  /** removeRouting is to remove a routing config with given routing ID. */
  removeRouting: Scalars['Int']['output']
  /** removeSubscriptions is to remove subscriptions with given ID list. */
  removeSubscriptions: Scalars['Int']['output']
  /** renameConfig is to give the config a new name. */
  renameConfig: Scalars['Int']['output']
  /** renameDns is to give the dns config a new name. */
  renameDns: Scalars['Int']['output']
  /** renameGroup is to rename a group. */
  renameGroup: Scalars['Int']['output']
  /** renameRouting is to give the routing config a new name. */
  renameRouting: Scalars['Int']['output']
  /** run proxy with selected config+dns+routing. Dry-run can be used to stop the proxy. */
  run: Scalars['Int']['output']
  /** selectConfig is to select a config as the current config. */
  selectConfig: Scalars['Int']['output']
  /** selectConfig is to select a dns config as the current dns. */
  selectDns: Scalars['Int']['output']
  /** selectConfig is to select a routing config as the current routing. */
  selectRouting: Scalars['Int']['output']
  /** setJsonStorage set given paths to values in user related json storage. Refer to https://github.com/tidwall/sjson */
  setJsonStorage: Scalars['Int']['output']
  /** tagNode is to give the node a new tag. */
  tagNode: Scalars['Int']['output']
  /** tagSubscription is to give the subscription a new tag. */
  tagSubscription: Scalars['Int']['output']
  /** updateAvatar update avatar for current user. Remove avatar if avatar is null. Blob base64 encoded image is recommended. */
  updateAvatar: Scalars['Int']['output']
  /** updateConfig allows to partially update global config with given id. */
  updateConfig: Config
  /** updateDns is to update dns config with given id. */
  updateDns: Dns
  /** updateName update name for current user. Remove name if name is null. */
  updateName: Scalars['Int']['output']
  /** updateNode is to update a node with no subscription ID. */
  updateNode: Node
  /** updatePassword update password for current user. currentPassword is needed to authenticate. Return new token. */
  updatePassword: Scalars['String']['output']
  /** updateRouting is to update routing config with given id. */
  updateRouting: Routing
  /** updateSubscription is to re-fetch subscription and resolve subscription into nodes. Old nodes that independently belong to any groups will not be removed. */
  updateSubscription: Subscription
  /** updateUsername update username for current user. */
  updateUsername: Scalars['Int']['output']
}

export type MutationCreateConfigArgs = {
  global?: InputMaybe<GlobalInput>
  name?: InputMaybe<Scalars['String']['input']>
}

export type MutationCreateDnsArgs = {
  dns?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type MutationCreateGroupArgs = {
  name: Scalars['String']['input']
  policy: Policy
  policyParams?: InputMaybe<Array<PolicyParam>>
}

export type MutationCreateRoutingArgs = {
  name?: InputMaybe<Scalars['String']['input']>
  routing?: InputMaybe<Scalars['String']['input']>
}

export type MutationCreateUserArgs = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type MutationGroupAddNodesArgs = {
  id: Scalars['ID']['input']
  nodeIDs: Array<Scalars['ID']['input']>
}

export type MutationGroupAddSubscriptionsArgs = {
  id: Scalars['ID']['input']
  subscriptionIDs: Array<Scalars['ID']['input']>
}

export type MutationGroupDelNodesArgs = {
  id: Scalars['ID']['input']
  nodeIDs: Array<Scalars['ID']['input']>
}

export type MutationGroupDelSubscriptionsArgs = {
  id: Scalars['ID']['input']
  subscriptionIDs: Array<Scalars['ID']['input']>
}

export type MutationGroupSetPolicyArgs = {
  id: Scalars['ID']['input']
  policy: Policy
  policyParams?: InputMaybe<Array<PolicyParam>>
}

export type MutationImportNodesArgs = {
  args: Array<ImportArgument>
  rollbackError: Scalars['Boolean']['input']
}

export type MutationImportSubscriptionArgs = {
  arg: ImportArgument
  rollbackError: Scalars['Boolean']['input']
}

export type MutationRemoveConfigArgs = {
  id: Scalars['ID']['input']
}

export type MutationRemoveDnsArgs = {
  id: Scalars['ID']['input']
}

export type MutationRemoveGroupArgs = {
  id: Scalars['ID']['input']
}

export type MutationRemoveJsonStorageArgs = {
  paths?: InputMaybe<Array<Scalars['String']['input']>>
}

export type MutationRemoveNodesArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type MutationRemoveRoutingArgs = {
  id: Scalars['ID']['input']
}

export type MutationRemoveSubscriptionsArgs = {
  ids: Array<Scalars['ID']['input']>
}

export type MutationRenameConfigArgs = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationRenameDnsArgs = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationRenameGroupArgs = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationRenameRoutingArgs = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationRunArgs = {
  dry: Scalars['Boolean']['input']
}

export type MutationSelectConfigArgs = {
  id: Scalars['ID']['input']
}

export type MutationSelectDnsArgs = {
  id: Scalars['ID']['input']
}

export type MutationSelectRoutingArgs = {
  id: Scalars['ID']['input']
}

export type MutationSetJsonStorageArgs = {
  paths: Array<Scalars['String']['input']>
  values: Array<Scalars['String']['input']>
}

export type MutationTagNodeArgs = {
  id: Scalars['ID']['input']
  tag: Scalars['String']['input']
}

export type MutationTagSubscriptionArgs = {
  id: Scalars['ID']['input']
  tag: Scalars['String']['input']
}

export type MutationUpdateAvatarArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>
}

export type MutationUpdateConfigArgs = {
  global: GlobalInput
  id: Scalars['ID']['input']
}

export type MutationUpdateDnsArgs = {
  dns: Scalars['String']['input']
  id: Scalars['ID']['input']
}

export type MutationUpdateNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type MutationUpdateNodeArgs = {
  id: Scalars['ID']['input']
  newLink: Scalars['String']['input']
}

export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String']['input']
  newPassword: Scalars['String']['input']
}

export type MutationUpdateRoutingArgs = {
  id: Scalars['ID']['input']
  routing: Scalars['String']['input']
}

export type MutationUpdateSubscriptionArgs = {
  id: Scalars['ID']['input']
}

export type MutationUpdateUsernameArgs = {
  username: Scalars['String']['input']
}

export type Node = {
  __typename?: 'Node'
  address: Scalars['String']['output']
  id: Scalars['ID']['output']
  link: Scalars['String']['output']
  name: Scalars['String']['output']
  protocol: Scalars['String']['output']
  subscriptionID?: Maybe<Scalars['ID']['output']>
  tag?: Maybe<Scalars['String']['output']>
}

export type NodeImportResult = {
  __typename?: 'NodeImportResult'
  error?: Maybe<Scalars['String']['output']>
  link: Scalars['String']['output']
  node?: Maybe<Node>
}

export type NodesConnection = {
  __typename?: 'NodesConnection'
  edges: Array<Node>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['ID']['output']>
  hasNextPage: Scalars['Boolean']['output']
  startCursor?: Maybe<Scalars['ID']['output']>
}

export type Param = {
  __typename?: 'Param'
  key: Scalars['String']['output']
  val: Scalars['String']['output']
}

export type Plaintext = {
  __typename?: 'Plaintext'
  val: Scalars['String']['output']
}

export enum Policy {
  Fixed = 'fixed',
  Min = 'min',
  MinAvg10 = 'min_avg10',
  MinMovingAvg = 'min_moving_avg',
  Random = 'random'
}

export type PolicyParam = {
  key?: InputMaybe<Scalars['String']['input']>
  val: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query'
  configFlatDesc: Array<ConfigFlatDesc>
  configs: Array<Config>
  dnss: Array<Dns>
  general: General
  group: Group
  groups: Array<Group>
  healthCheck: Scalars['Int']['output']
  /** jsonStorage get given paths from user related json storage. Empty paths is to get all. Refer to https://github.com/tidwall/gjson */
  jsonStorage: Array<Scalars['String']['output']>
  nodes: NodesConnection
  numberUsers: Scalars['Int']['output']
  parsedDns: DaeDns
  parsedRouting: DaeRouting
  routings: Array<Routing>
  subscriptions: Array<Subscription>
  token: Scalars['String']['output']
  user: User
}

export type QueryConfigsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  selected?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryDnssArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  selected?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryGroupArgs = {
  name: Scalars['String']['input']
}

export type QueryGroupsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryJsonStorageArgs = {
  paths?: InputMaybe<Array<Scalars['String']['input']>>
}

export type QueryNodesArgs = {
  after?: InputMaybe<Scalars['ID']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  subscriptionId?: InputMaybe<Scalars['ID']['input']>
}

export type QueryParsedDnsArgs = {
  raw: Scalars['String']['input']
}

export type QueryParsedRoutingArgs = {
  raw: Scalars['String']['input']
}

export type QueryRoutingsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  selected?: InputMaybe<Scalars['Boolean']['input']>
}

export type QuerySubscriptionsArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryTokenArgs = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export enum Role {
  Admin = 'admin'
}

export type Routing = {
  __typename?: 'Routing'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  referenceGroups: Array<Scalars['String']['output']>
  routing: DaeRouting
  selected: Scalars['Boolean']['output']
}

export type RoutingRule = {
  __typename?: 'RoutingRule'
  conditions: AndFunctions
  outbound: Function
}

export type Subscription = {
  __typename?: 'Subscription'
  id: Scalars['ID']['output']
  info: Scalars['String']['output']
  link: Scalars['String']['output']
  nodes: NodesConnection
  status: Scalars['String']['output']
  tag?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['Time']['output']
}

export type SubscriptionNodesArgs = {
  after?: InputMaybe<Scalars['ID']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}

export type SubscriptionImportResult = {
  __typename?: 'SubscriptionImportResult'
  link: Scalars['String']['output']
  nodeImportResult: Array<NodeImportResult>
  sub: Subscription
}

export type User = {
  __typename?: 'User'
  avatar?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  username: Scalars['String']['output']
}

export type _Service = {
  __typename?: '_Service'
  sdl: Scalars['String']['output']
}

export type GlobalInput = {
  allowInsecure?: InputMaybe<Scalars['Boolean']['input']>
  autoConfigKernelParameter?: InputMaybe<Scalars['Boolean']['input']>
  checkInterval?: InputMaybe<Scalars['Duration']['input']>
  checkTolerance?: InputMaybe<Scalars['Duration']['input']>
  dialMode?: InputMaybe<Scalars['String']['input']>
  disableWaitingNetwork?: InputMaybe<Scalars['Boolean']['input']>
  lanInterface?: InputMaybe<Array<Scalars['String']['input']>>
  logLevel?: InputMaybe<Scalars['String']['input']>
  sniffingTimeout?: InputMaybe<Scalars['Duration']['input']>
  soMarkFromDae?: InputMaybe<Scalars['Int']['input']>
  tcpCheckHttpMethod?: InputMaybe<Scalars['String']['input']>
  tcpCheckUrl?: InputMaybe<Array<Scalars['String']['input']>>
  tlsImplementation?: InputMaybe<Scalars['String']['input']>
  tproxyPort?: InputMaybe<Scalars['Int']['input']>
  tproxyPortProtect?: InputMaybe<Scalars['Boolean']['input']>
  udpCheckDns?: InputMaybe<Array<Scalars['String']['input']>>
  utlsImitate?: InputMaybe<Scalars['String']['input']>
  wanInterface?: InputMaybe<Array<Scalars['String']['input']>>
}

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    username: string
    name?: string | null
    avatar?: string | null
  }
}

export type TokenQueryVariables = Exact<{
  username: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type TokenQuery = { __typename?: 'Query'; token: string }

export const UserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'User' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'avatar' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<UserQuery, UserQueryVariables>
export const TokenDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Token' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' }
            }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' }
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' }
            }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'token' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'username' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' }
                }
              }
            ]
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<TokenQuery, TokenQueryVariables>
