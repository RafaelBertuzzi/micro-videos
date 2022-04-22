import { validate as uuidValidate } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntity Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("it should return a uuid equal to passed to constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "04e1a110-d752-40e1-9dd1-df0ee90c841f";
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("it should return a valid uuid from the uuid passed to constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "04e1a110-d752-40e1-9dd1-df0ee90c841f";
    const vo = new UniqueEntityId(uuid);
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
