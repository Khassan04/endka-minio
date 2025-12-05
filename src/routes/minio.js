const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const { MinioClient } = require('../config/minio');

const bucket = process.env.MINIO_BUCKET;
const foldertxt = "Txt-files";
const folderpng = "Png-files";

router.post('/upload-txt', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Требуется файл .txt" });
        }

        if (!file.originalname.endsWith(".txt")) {
            return res.status(400).json({ message: "Разрешены только .txt файлы" });
        }

        const objectName = `${foldertxt}/${file.originalname}`;

        await MinioClient.putObject(bucket, objectName, file.buffer);

        res.json({ message: "Файл .txt успешно загружен в папку Txt-files", filename: file.originalname });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/upload-png', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Требуется файл .png" });
        }

        if (!file.originalname.endsWith(".png")) {
            return res.status(400).json({ message: "Разрешены только .png файлы" });
        }

        const objectName = `${folderpng}/${file.originalname}`;

        await MinioClient.putObject(bucket, objectName, file.buffer);

        res.json({ message: "Файл .png успешно загружен в папку Png-files", filename: file.originalname });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
