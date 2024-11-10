import { characters } from "../../src/js-foundation/02-destructuring";

describe("02-destructuring", () => {
  test("characters should contain Flash, Superman", () => {
    expect(characters).toContain("Flash");
    expect(characters).toContain("Superman");
  });

  test('first character should be "Flash" and second character should be "Superman"', () => {
    const [first, second] = characters;
    expect(first).toBe("Flash");
    expect(second).toBe("Superman");
  });
});
