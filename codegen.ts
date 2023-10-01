// noinspection JSUnusedGlobalSymbols

import { CodegenConfig } from '@graphql-codegen/cli'

export default {
  overwrite: true,
  schema: process.env.SCHEMA_PATH,
  documents: 'src/**/*',
  generates: { 'src/apis/gql/': { preset: 'client' } },
  hooks: { afterOneFileWrite: ['prettier -w'] }
} satisfies CodegenConfig
