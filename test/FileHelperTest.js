const {listFiles} = require("../src/helper/FileHelper");

// yarn mocha ./test/FileHelperTest.js
describe("Simple", () => {
    // yarn mocha ./test/FileHelperTest.js -g test_listFiles
    it.only("test_listFiles", async () => {
        const files = await listFiles("./samples/png");
        console.log("Files in directory:", files);
    });

    it.only("test2", () => {
        console.log("Simple test2");
    });
});