const uploadFile = async (req, res) => {
    try {
        console.log("uploadFile enters...");
        res.json(req.file.filename);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
    console.log("uploadFile exits...");
}

module.exports = {
    uploadFile,
}