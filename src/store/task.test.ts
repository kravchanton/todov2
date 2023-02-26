import { sum } from "./task";

test('sum name', () => {
    const a =20;
    const b = 30;
    const result = sum(a, b)
    expect(result).toBe(50)
})