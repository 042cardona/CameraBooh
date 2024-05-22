const express = require('express');
const multer = require('multer');
const path = require('path');

// Configurar Multer para guardar los archivos en la carpeta bgvideos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'bgvideos');
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('video'), (req, res) => {
    console.log('Video recibido:', req.file);
    res.json({ message: 'Video subido con éxito' });
});

// Manejar cualquier otro request que no sea /upload
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
