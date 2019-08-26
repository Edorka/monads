const Process = require('../process');

test('Verify the process\'s value', () => {
    const process = Process.Step.of(3);
    expect(process.getValue()).toBe(3);
});

test('Verify a process\'s update', () => {
    const process = Process.Step.of(3);
    const doubleIt = x => x + x;
    const result = process.map(doubleIt);
    expect(result.isFailure()).toBe(false);
    expect(result.getValue()).toBe(6);
});

test('Verify a process\'s chain', () => {
    const process = Process.Step.of(3);
    const doubleIt = x => x + x
    expect(process.chain(doubleIt)).toBe(6);
});

test('produce a Failure after some steps', () => {
    const process = Process.Step.of(3);
    const doubleIt = x => x + x;
    const produceError = x => { throw new TypeError('Something went wrong') };
    const intermediate = process.map(doubleIt);
    expect(intermediate.getValue()).toBe(6);
    const result = intermediate.map(produceError).map(doubleIt);
    expect(result.isFailure()).toBe(true);
    expect(result.getValue()).toBe(6);
    expect(result.getReason() instanceof TypeError).toBe(true);
});
