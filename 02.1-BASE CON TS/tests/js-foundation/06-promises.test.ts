import { getPokemonById } from "../../src/js-foundation/06-promises";

describe("06-promises", () => {
  test("getPokemonById should return a pokemon", async () => {
    const pokemonId = 1;
    const pokemonName = await getPokemonById(pokemonId);
    expect(pokemonName).toBe("bulbasaur");
  });

  test("should return an error if pokemon does not exist", async () => {
    try {
      const pokemonId = 10000;
      await getPokemonById(pokemonId);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe("Pokemon no existe");
    }
  });
});
