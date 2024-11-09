const { buildHttpClient } = require("../plugins");

const httpClient = buildHttpClient();

const getPokemonById = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  // fetch(url).then((response) => {
  //   response.json().then((pokemon) => {
  //     callback && callback(pokemon);
  //   });
  // });

  // return fetch(url)
  //   .then((response) => response.json())
  //   .then((pokemon) => pokemon.name);

  // const pokemon = await fetch(url).then((response) => response.json());
  // return pokemon.name;

  const pokemon = await httpClient.get(url);
  return pokemon.name;
};

module.exports = {
  getPokemonById,
};
