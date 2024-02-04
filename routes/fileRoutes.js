const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const { uploadFile } = require('../controllers/fileController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;