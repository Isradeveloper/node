import { getUUID } from "../../src/plugins/get-id.plugin";

describe("get-id.plugin.ts", () => {
  test("getUUID() should return a UUID", () => {
    const uuid = getUUID();

    expect(typeof uuid).toBe("string");
    expect(uuid).toHaveLength(36);
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });
});
