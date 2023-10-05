const express = require('express');
const path = require("path");
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.post('/submit-multipart', upload.single('fileSample'), (req, res) => {
    res.send({ body: req.body, file: req.file });
});

app.post('/submit-urlencoded', (req, res) => {
    req.body.checkboxSample = req.body.checkboxSample ? true : false;
    res.send(req.body);
});

app.listen(HTTP_PORT, () => { console.log(`server listening on: ${HTTP_PORT}`) });