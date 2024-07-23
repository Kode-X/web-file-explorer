const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('files'));

const upload = multer({ dest: 'uploads/' });

const getFileStructure = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles.push({
        name: file,
        type: 'folder',
        children: getFileStructure(dirPath + "/" + file, []),
      });
    } else {
      arrayOfFiles.push({
        name: file,
        type: 'file',
        path: path.join(dirPath, "/", file),
      });
    }
  });

  return arrayOfFiles;
};

app.get('/files', (req, res) => {
  const fileStructure = getFileStructure('./files');
  res.json(fileStructure);
});

app.get('/file-content', (req, res) => {
  const filePath = req.query.path;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }
    res.send(data);
  });
});

app.post('/save-file', (req, res) => {
  const { path, content } = req.body;
  fs.writeFile(path, content, 'utf8', (err) => {
    if (err) {
      return res.status(500).send('Error writing file');
    }
    res.send('File saved successfully');
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, `./files/${req.file.originalname}`);

  fs.move(tempPath, targetPath, (err) => {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

app.delete('/files/:name', (req, res) => {
  const filePath = path.join(__dirname, `./files/${req.params.name}`);
  fs.remove(filePath, (err) => {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
