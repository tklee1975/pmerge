#! /usr/bin/env node
const PDFMerger = require("../src/PDFMerger");
const { program } = require('commander')

program.version('1.0.0');

program
    .option('-i, --input <input folder>', 'Specify the input folders')
program
    .option('-o, --output <output file>', 'Specify the output pdf file')
program
    .option('-m, --mode <fit mode>', 'Specify the fit mode', 'aspectFit')


program.parse(process.argv);

const options = program.opts();
// console.debug("program:", program.opts());

(async function () {
    const srcFolder = options.input;
    const output = options.output;
    const result = await PDFMerger.mergePDF(srcFolder, output, options);

    if (result) {
        console.log("PDFMerger success");
        console.log("merged PDF at ", output);
    } else {
        console.log("PDFMerger failed");
    }
})();
