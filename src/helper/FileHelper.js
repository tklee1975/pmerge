const fs = require('fs');


async function listFiles(dirLocation) {
    try {
        const files = await fs.promises.readdir(dirLocation);
        // console.log('Files in directory:', files);
        return files;
    } catch (err) {
        console.log('Error reading directory:', err);
        throw err;
    }
}

module.exports = {
    listFiles
};