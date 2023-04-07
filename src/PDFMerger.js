const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const { listFiles } = require("./helper/FileHelper");

const kVersion = "1.0.0";


loadBytes = async (path) => {
    const handle = await fs.readFileSync(path);
    return new Uint8Array(handle);
};


savePdf = async (pdfDoc, outFile) => {
    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync(outFile, pdfBytes);
}

info = () => {
    return "PDFMerger version: " + kVersion;
};

isImageFile = (file) => {
    const imageExt = ["jpg", "png", "jpeg"];
    const ext = file.split('.').pop();
    return imageExt.includes(ext);
}

getImageFiles = async (srcFolder) => {
    const files = await listFiles(srcFolder);

    let result = [];
    for (const file of files) {
        if (!isImageFile(file)) {
            continue;
        }
        let fullPath = `${srcFolder}/${file}`
        result.push(fullPath);
    }

    return result;
}



getImageSize = (pdfImage, { pageWidth, pageHeight }, fitMode) => {
    let imageWidth = pdfImage.width;
    let imageHeight = pdfImage.height;

    // console.debug("fitMode=", fitMode, " imageWidth=", imageWidth, " imageHeight=", imageHeight, " pageWidth=", pageWidth, " pageHeight=", pageHeight);
    const imgWidthScale = pageWidth / imageWidth;
    const imgHeightScale = pageHeight / imageHeight;

    let scale = 1.0;
    if (fitMode === 'aspectFill') {
        // return pdfImage.scaleToHeight(pageHeight);
        scale = Math.max(imgWidthScale, imgHeightScale);
    } else {    // aspectFit
        scale = Math.min(imgWidthScale, imgHeightScale);
        // return pdfImage.scaleToFit(pageWidth, pageHeight);
    }

    // const scale = Math.max(imgWidthScale, imgHeightScale);

    return pdfImage.scale(scale);
}


// const pngDims = pdfImage.scaleToFit(
//     pageWidth, pageHeight);


getImageTransform = (pdfImage, { pageWidth, pageHeight }, options) => {
    // console.debug("options=", options);
    const mode = options?.mode || 'aspectFit';

    const imageDimen = getImageSize(pdfImage, { pageWidth, pageHeight }, mode);
    // pdfImage.scaleToFit(
    //     pageWidth, pageHeight);
    //  pdfImage.scale(0.1);


    // console.debug("pngDims:", pngDims);
    // console.debug("pageSize: ", page.getSize()
    //     , " pageWidth:", pageWidth, " pageHeight:", pageHeight);
    const centerX = (pageWidth - imageDimen.width) / 2;
    const centerY = (pageHeight - imageDimen.height) / 2;

    return {
        x: centerX,
        y: centerY,
        width: imageDimen.width,
        height: imageDimen.height,
    };
}

getImageType = (imageFile) => {
    const ext = imageFile.split('.').pop();
    if (ext === 'jpg' || ext === 'jpeg') {
        return 'jpg';
    } else if (ext === 'png') {
        return 'png';
    } else {
        return 'unknown';
    }
}

createPageForImage = async (pdfDoc, pageSize, imageFile, options={}) => {
    const page = pdfDoc.addPage(pageSize);
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    // , pageHeight } = page.getSize();

    const imageData = await loadBytes(imageFile);
    const imageType = getImageType(imageFile);
    
    
    // Loading image
    let pdfImage = null;
    if(imageType === 'jpg') {
        pdfImage = await pdfDoc.embedJpg(imageData);
    } else if (imageType === 'png') {
        pdfImage = await pdfDoc.embedPng(imageData);
    } else {
        console.error("Unknown image type:", imageType);
        return;
    }
    // const pdfImage = await pdfDoc.embedJpg(imageData);

    const transform = getImageTransform(pdfImage,
                 { pageWidth, pageHeight }, options);

    // console.debug("transform:", transform);

    page.drawImage(pdfImage, {
        x: transform.x,
        y: transform.y,
        width: transform.width,
        height: transform.height,
        // scale: 0.2,
    });
}

mergePDF = async (srcFolder, outFile, options) => {
    // const pdfBytes = await pdfDoc.save()
    const pdfDoc = await PDFDocument.create()
    const pageSize = [595.28, 841.89];
    // const page = pdfDoc.addPage([595.28, 841.89]);

    // Loading the image file list
    const images = await getImageFiles(srcFolder);
    if (images.length === 0) {
        console.log("No image files found in folder:", srcFolder);
        return false;
    }

    // Embedding the image files
    // createPageForImage = async (pdfDoc, pageSize, imageFile) => 
    for (const image of images) {
        await createPageForImage(pdfDoc, pageSize, image, options);
    }


    await savePdf(pdfDoc, outFile);

    return true;
}


const PDFMerger = {
    info,
    mergePDF,
};

module.exports = PDFMerger;