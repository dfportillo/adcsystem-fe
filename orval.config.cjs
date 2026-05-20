module.exports = {
  adcsystem: {
    output: {
      mode: 'tags-split', // Te separa los archivos por entidad (Machine, Process, etc.)
      target: './src/api/endpoints',
      schemas: './src/api/model',
      client: 'axios', 
      mock: false,
      override: {
        mutator: {
          path: './src/lib/axios.ts',
          name: 'axiosInstance',
        },
      },
    },
    input: {
      target: 'http://admin.localhost:8000/api/schema/',
    },
  },
};