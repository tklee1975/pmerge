// import { PDFDocument } from 'pdf-lib'
// import fs from 'fs'
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");


loadBytes = async (path) => {
    const handle = await fs.readFileSync(path);
    return new Uint8Array(handle);
};


savePdf = async (pdfDoc, outFile) => {
    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync(`./output/${outFile}`, pdfBytes);
}

// yarn mocha ./test/pdfTest.js
describe("Simple", () => {
    // yarn mocha ./test/pdfTest.js -g test_addImage
    it.only("test_addImage", async () => {
        const pdfDoc = await PDFDocument.create()
        // const page = pdfDoc.addPage()
        const page = pdfDoc.addPage([595.28, 841.89]);
        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();
        // , pageHeight } = page.getSize();
        const embedImage = await loadBytes("./assets/photo-1.jpg");
        const pdfImage = await pdfDoc.embedJpg(embedImage);


        // const pageSize = { width: pageWidth, height: pageHeight }
        const pngDims = pdfImage.scaleToFit(pageWidth, pageHeight);
        //  pdfImage.scale(0.1);


        console.debug("pngDims:", pngDims);
        console.debug("pageSize: ", page.getSize()
            , " pageWidth:", pageWidth, " pageHeight:", pageHeight);
        const centerX = pageWidth / 2 - pngDims.width / 2;
        const centerY = pageHeight / 2 - pngDims.height / 2;

        page.drawImage(pdfImage, {
            x: centerX,
            y: centerY,
            width: pngDims.width,
            height: pngDims.height,
        });

        console.log("pdfDoc:", pdfDoc);

        await savePdf(pdfDoc, "test_addImage.pdf");
        // const pdfBytes = await pdfDoc.save()
        // fs.writeFileSync("./output/test_create.pdf", pdfBytes);
    });


    // yarn mocha ./test/pdfTest.js -g test_create
    it.only("test_create", async () => {
        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage()

        console.log("pdfDoc:", pdfDoc);

        await savePdf(pdfDoc, "test_create.pdf");
        // const pdfBytes = await pdfDoc.save()
        // fs.writeFileSync("./output/test_create.pdf", pdfBytes);
    });

    it.only("test2", () => {
        console.log("Simple test2");
    });
});