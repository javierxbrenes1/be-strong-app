import type { CodegenConfig } from '@graphql-codegen/cli';

// Requiere el servidor arriba (npm run dev-server) para leer el esquema.
const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: [
    'src/client/features/**/*.{ts,tsx}',
    'src/client/design-system/**/*.{ts,tsx}',
  ],
  ignoreNoDocuments: true,
  generates: {
    'src/client/gql/': {
      preset: 'client',
      config: {
        scalars: {
          Date: 'number',
          LocalDate: 'string',
          LocalTime: 'string',
          UUID: 'string',
        },
      },
    },
  },
};

export default config;
