import { CodegenConfig } from '@graphql-codegen/cli'

export default {
  overwrite: true,
  schema: process.env.SCHEMA_PATH,
  documents: 'src/**/*',
  generates: {
    'src/apis/gql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    }
  },
  hooks: { afterOneFileWrite: ['prettier -w'] }
} satisfies CodegenConfig
