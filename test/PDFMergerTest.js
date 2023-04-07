const PDFMerger = require("../src/PDFMerger");
const rewire = require("rewire");

const PDFMergerRewired = rewire("../src/PDFMerger");

// yarn mocha ./test/PDFMergerTest.js
describe("Simple", () => {
    // 
    // yarn mocha ./test/PDFMergerTest.js -g test_getImageFiles
    it.only("test_getImageFiles", async () => {
        // const output = "./output/test_mergePDF.pdf";
        // const srcFolder = "./assets";

        // // console.log("PDFMerger info:", PDFMerger.info()); 
        // const result = await PDFMerger.mergePDF(srcFolder, output);
        // console.log("PDFMerger result:", result);
        const srcFolder = "./samples/png";

        const internalFunction = PDFMergerRewired.__get__('getImageFiles');
        const result = await internalFunction(srcFolder);

        console.log("PDFMerger result:", result);

    });

    // yarn mocha ./test/PDFMergerTest.js -g test_mergePDF_aspectFit_png
    it.only("test_mergePDF_aspectFit_png", async () => {
        const output = "./output/test_mergePDF_fit.pdf";
        const srcFolder = "./samples/png";
        const options = {
            mode: "aspectFit",
        }

        // console.log("PDFMerger info:", PDFMerger.info()); 
        const result = await PDFMerger.mergePDF(srcFolder, output, options);
        console.log("PDFMerger result:", result);
    });

    

    // yarn mocha ./test/PDFMergerTest.js -g test_mergePDF_aspectFit_jpeg
    it.only("test_mergePDF_aspectFit_jpeg", async () => {
        const output = "./output/test_mergePDF_fit.pdf";
        const srcFolder = "./samples/jpeg";
        const options = {
            mode: "aspectFit",
        }

        // console.log("PDFMerger info:", PDFMerger.info()); 
        const result = await PDFMerger.mergePDF(srcFolder, output, options);
        console.log("PDFMerger result:", result);
    });

    // yarn mocha ./test/PDFMergerTest.js -g test_mergePDF_apsectFill
    it.only("test_mergePDF_apsectFill", async () => {
        const output = "./output/test_mergePDF_fill.pdf";
        const srcFolder = "./samples/jpeg";
        const options = {
            mode: "aspectFill",
        }

        // console.log("PDFMerger info:", PDFMerger.info()); 
        const result = await PDFMerger.mergePDF(srcFolder, output, options);
        console.log("PDFMerger result:", result);
    });

    // yarn mocha ./test/PDFMergerTest.js -g test_info
    it.only("test_info", () => {
        console.log("PDFMerger info:", PDFMerger.info());
    });

    it.only("test2", () => {
        console.log("Simple test2");
    });
});