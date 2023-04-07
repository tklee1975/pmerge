
// yarn mocha ./test/simpleTest.js
describe("Simple", () => {
    // yarn mocha ./test/simpleTest.js -g test1
    it.only("test1", () => {
        console.log("Simple test1");
    });

    it.only("test2", () => {
        console.log("Simple test2");
    });
});