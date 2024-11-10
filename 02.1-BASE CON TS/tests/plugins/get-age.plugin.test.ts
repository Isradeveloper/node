import { getAge } from "../../src/plugins/get-age.plugin";

describe("get-age.plugin.ts", () => {
  test("getAge() should return the age of a person", () => {
    const birthdate = "2002-05-31";
    const age = getAge(birthdate);

    expect(typeof age).toBe("number");
  });

  test("getAge() should return the correct age", () => {
    const birthdate = "2002-05-31";
    const age = getAge(birthdate);

    const calculatedAge =
      new Date().getFullYear() - new Date(birthdate).getFullYear();

    expect(age).toBe(calculatedAge);
  });

  test("getAge should return 0 years", () => {
    const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(2000);

    const birthdate = "2000-05-31";
    const age = getAge(birthdate);

    expect(age).toBe(0);
    expect(spy).toHaveBeenCalled();
  });
});
