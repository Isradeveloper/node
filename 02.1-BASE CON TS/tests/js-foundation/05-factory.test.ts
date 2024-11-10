import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe("05-factory", () => {
  test("buildMakePerson should return a function", () => {
    const getUUID = () => "1234";
    const getAge = () => 30;

    const makePerson = buildMakePerson({ getUUID, getAge });
    expect(typeof makePerson).toBe("function");
  });

  test("makePerson should return a person object", () => {
    const getUUID = () => "1234";
    const getAge = () => 30;

    const makePerson = buildMakePerson({ getUUID, getAge });

    const person = makePerson({ name: "John", birthdate: "1985-10-21" });

    expect(person).toEqual({
      id: "1234",
      name: "John",
      birthdate: "1985-10-21",
      age: 30,
    });
  });
});
