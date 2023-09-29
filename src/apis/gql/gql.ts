/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n          query JsonStorage($paths: [String!]) {\n            jsonStorage(paths: $paths)\n          }\n        ':
    types.JsonStorageDocument,
  '\n          query General($interfacesUp: Boolean) {\n            general {\n              dae {\n                running\n                modified\n                version\n              }\n\n              interfaces(up: $interfacesUp) {\n                name\n                ifindex\n                ip\n                flag {\n                  default {\n                    ipVersion\n                    gateway\n                    source\n                  }\n                }\n              }\n            }\n          }\n        ':
    types.GeneralDocument,
  '\n          query Nodes {\n            nodes {\n              edges {\n                id\n                name\n                link\n                address\n                protocol\n                tag\n              }\n            }\n          }\n        ':
    types.NodesDocument,
  '\n          query Subscriptions {\n            subscriptions {\n              id\n              tag\n              status\n              link\n              info\n              updatedAt\n              nodes {\n                edges {\n                  id\n                  name\n                  protocol\n                  link\n                }\n              }\n            }\n          }\n        ':
    types.SubscriptionsDocument,
  '\n          query Configs {\n            configs {\n              id\n              name\n              selected\n              global {\n                logLevel\n                tproxyPort\n                allowInsecure\n                checkInterval\n                checkTolerance\n                lanInterface\n                wanInterface\n                udpCheckDns\n                tcpCheckUrl\n                dialMode\n                tcpCheckHttpMethod\n                disableWaitingNetwork\n                autoConfigKernelParameter\n                sniffingTimeout\n                tlsImplementation\n                utlsImitate\n                tproxyPortProtect\n                soMarkFromDae\n              }\n            }\n          }\n        ':
    types.ConfigsDocument,
  '\n          query Groups {\n            groups {\n              id\n              name\n              nodes {\n                id\n                link\n                name\n                address\n                protocol\n                tag\n                subscriptionID\n              }\n              subscriptions {\n                id\n                updatedAt\n                tag\n                link\n                status\n                info\n\n                nodes {\n                  edges {\n                    id\n                    link\n                    name\n                    address\n                    protocol\n                    tag\n                    subscriptionID\n                  }\n                }\n              }\n              policy\n              policyParams {\n                key\n                val\n              }\n            }\n          }\n        ':
    types.GroupsDocument,
  '\n          query Routings {\n            routings {\n              id\n              name\n              selected\n              routing {\n                string\n              }\n            }\n          }\n        ':
    types.RoutingsDocument,
  '\n          query DNSs {\n            dnss {\n              id\n              name\n              dns {\n                string\n\n                routing {\n                  request {\n                    string\n                  }\n                  response {\n                    string\n                  }\n                }\n              }\n              selected\n            }\n          }\n        ':
    types.DnSsDocument,
  '\n          query User {\n            user {\n              username\n              name\n              avatar\n            }\n          }\n        ':
    types.UserDocument,
  '\n        query User {\n          user {\n            username\n            name\n            avatar\n          }\n        }\n      ':
    types.UserDocument,
  '\n                  query Token($username: String!, $password: String!) {\n                    token(username: $username, password: $password)\n                  }\n                ':
    types.TokenDocument
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query JsonStorage($paths: [String!]) {\n            jsonStorage(paths: $paths)\n          }\n        '
): (typeof documents)['\n          query JsonStorage($paths: [String!]) {\n            jsonStorage(paths: $paths)\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query General($interfacesUp: Boolean) {\n            general {\n              dae {\n                running\n                modified\n                version\n              }\n\n              interfaces(up: $interfacesUp) {\n                name\n                ifindex\n                ip\n                flag {\n                  default {\n                    ipVersion\n                    gateway\n                    source\n                  }\n                }\n              }\n            }\n          }\n        '
): (typeof documents)['\n          query General($interfacesUp: Boolean) {\n            general {\n              dae {\n                running\n                modified\n                version\n              }\n\n              interfaces(up: $interfacesUp) {\n                name\n                ifindex\n                ip\n                flag {\n                  default {\n                    ipVersion\n                    gateway\n                    source\n                  }\n                }\n              }\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query Nodes {\n            nodes {\n              edges {\n                id\n                name\n                link\n                address\n                protocol\n                tag\n              }\n            }\n          }\n        '
): (typeof documents)['\n          query Nodes {\n            nodes {\n              edges {\n                id\n                name\n                link\n                address\n                protocol\n                tag\n              }\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query Subscriptions {\n            subscriptions {\n              id\n              tag\n              status\n              link\n              info\n              updatedAt\n              nodes {\n                edges {\n                  id\n                  name\n                  protocol\n                  link\n                }\n              }\n            }\n          }\n        '
): (typeof documents)['\n          query Subscriptions {\n            subscriptions {\n              id\n              tag\n              status\n              link\n              info\n              updatedAt\n              nodes {\n                edges {\n                  id\n                  name\n                  protocol\n                  link\n                }\n              }\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query Configs {\n            configs {\n              id\n              name\n              selected\n              global {\n                logLevel\n                tproxyPort\n                allowInsecure\n                checkInterval\n                checkTolerance\n                lanInterface\n                wanInterface\n                udpCheckDns\n                tcpCheckUrl\n                dialMode\n                tcpCheckHttpMethod\n                disableWaitingNetwork\n                autoConfigKernelParameter\n                sniffingTimeout\n                tlsImplementation\n                utlsImitate\n                tproxyPortProtect\n                soMarkFromDae\n              }\n            }\n          }\n        '
): (typeof documents)['\n          query Configs {\n            configs {\n              id\n              name\n              selected\n              global {\n                logLevel\n                tproxyPort\n                allowInsecure\n                checkInterval\n                checkTolerance\n                lanInterface\n                wanInterface\n                udpCheckDns\n                tcpCheckUrl\n                dialMode\n                tcpCheckHttpMethod\n                disableWaitingNetwork\n                autoConfigKernelParameter\n                sniffingTimeout\n                tlsImplementation\n                utlsImitate\n                tproxyPortProtect\n                soMarkFromDae\n              }\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query Groups {\n            groups {\n              id\n              name\n              nodes {\n                id\n                link\n                name\n                address\n                protocol\n                tag\n                subscriptionID\n              }\n              subscriptions {\n                id\n                updatedAt\n                tag\n                link\n                status\n                info\n\n                nodes {\n                  edges {\n                    id\n                    link\n                    name\n                    address\n                    protocol\n                    tag\n                    subscriptionID\n                  }\n                }\n              }\n              policy\n              policyParams {\n                key\n                val\n              }\n            }\n          }\n        '
): (typeof documents)['\n          query Groups {\n            groups {\n              id\n              name\n              nodes {\n                id\n                link\n                name\n                address\n                protocol\n                tag\n                subscriptionID\n              }\n              subscriptions {\n                id\n                updatedAt\n                tag\n                link\n                status\n                info\n\n                nodes {\n                  edges {\n                    id\n                    link\n                    name\n                    address\n                    protocol\n                    tag\n                    subscriptionID\n                  }\n                }\n              }\n              policy\n              policyParams {\n                key\n                val\n              }\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query Routings {\n            routings {\n              id\n              name\n              selected\n              routing {\n                string\n              }\n            }\n          }\n        '
): (typeof documents)['\n          query Routings {\n            routings {\n              id\n              name\n              selected\n              routing {\n                string\n              }\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query DNSs {\n            dnss {\n              id\n              name\n              dns {\n                string\n\n                routing {\n                  request {\n                    string\n                  }\n                  response {\n                    string\n                  }\n                }\n              }\n              selected\n            }\n          }\n        '
): (typeof documents)['\n          query DNSs {\n            dnss {\n              id\n              name\n              dns {\n                string\n\n                routing {\n                  request {\n                    string\n                  }\n                  response {\n                    string\n                  }\n                }\n              }\n              selected\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n          query User {\n            user {\n              username\n              name\n              avatar\n            }\n          }\n        '
): (typeof documents)['\n          query User {\n            user {\n              username\n              name\n              avatar\n            }\n          }\n        ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n        query User {\n          user {\n            username\n            name\n            avatar\n          }\n        }\n      '
): (typeof documents)['\n        query User {\n          user {\n            username\n            name\n            avatar\n          }\n        }\n      ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n                  query Token($username: String!, $password: String!) {\n                    token(username: $username, password: $password)\n                  }\n                '
): (typeof documents)['\n                  query Token($username: String!, $password: String!) {\n                    token(username: $username, password: $password)\n                  }\n                ']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
