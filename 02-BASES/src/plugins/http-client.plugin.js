const axios = require("axios");

// const httpClientPlugin = {
//   get: async (url) => {
//     const { data } = await axios.get(url);
//     return data;
//     // const response = await fetch(url);
//     // return response.json();
//   },
// };

const buildHttpClient = (headers) => {
  return {
    get: async (url) => {
      const { data } = await axios.get(url, headers);
      return data;
    },
  };
};

module.exports = {
  buildHttpClient,
};
