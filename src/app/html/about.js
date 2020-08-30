const promise1 = new Promise(resolve=>resolve('this is promise1'));
const promise2 = new Promise(resolve=>resolve('this is promise2'));

// Bad
const syncFunction = async () => {
    const result1 = await promise1();
    const result2 = await promise2();

    return result1+result2;
}

// Good
const asyncFunction = async () => {
    const results = await Promise.all(promise1, promise2);

    return results[0]+results[1];
}