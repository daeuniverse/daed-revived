import { CodegenConfig } from '@graphql-codegen/cli'

export default {
  schema: process.env.SCHEMA_PATH,
  documents: 'src/**/*.{ts,tsx,graphql}',
  generates: {
    'src/gql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
  hooks: { afterOneFileWrite: ['prettier -w'] },
} satisfies CodegenConfig
