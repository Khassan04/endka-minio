const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const { MinioClient } = require('../config/minio');

const bucket = process.env.MINIO_BUCKET;
const foldertxt = "Txt-files";

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

module.exports = router;
