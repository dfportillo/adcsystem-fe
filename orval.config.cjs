module.exports = {
  adcsystem: {
    output: {
      mode: 'tags-split',
      target: './src/api/endpoints',
      schemas: './src/api/model',
      client: 'axios',
      mock: false,
      override: {
        mutator: {
          path: './src/lib/axios.ts',
          name: 'customAxios',
        },
      },
    },
    input: {
      target: 'http://admin.localhost:8000/api/schema/',
    },
  },
};