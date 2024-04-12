import express from 'express';
import multer from 'multer';
import { imread, ORBDetector, matchBruteForceHamming } from 'opencv4nodejs';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/login', upload.array('imagenes', 3), (req, res) => {
    const { codigo, password } = req.body;
  
    // Consulta a la base de datos para obtener el usuario
    const query = 'SELECT * FROM usuarios WHERE codigo = ? AND password = ?';
    db.query(query, [codigo, password], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      if (results.length > 0) {
        // Usuario encontrado, ahora compara las imágenes
        const usuario = results[0];
  
        // Las imágenes se almacenan en req.files
        console.log(req.files);
  
        // Aquí puedes procesar las imágenes como necesites
        // y compararlas con las imágenes del usuario
  
        const img1 = imread(req.files[0].path);
        const img2 = imread(usuario.foto);
  
        const orbDetector = new ORBDetector();
        const keyPoints1 = orbDetector.detect(img1);
        const keyPoints2 = orbDetector.detect(img2);
  
        const descriptors1 = orbDetector.compute(img1, keyPoints1);
        const descriptors2 = orbDetector.compute(img2, keyPoints2);
  
        const matches = matchBruteForceHamming(descriptors1, descriptors2);
  
        console.log('Número de coincidencias:', matches.length);
  
        // Si las imágenes coinciden, envía una respuesta positiva
        // Si no, envía una respuesta negativa
  
        if (matches.length > umbral) {
          res.send('Imágenes subidas y usuario verificado');
        } else {
          res.status(401).send('Las imágenes no coinciden');
        }
      } else {
        // Usuario no encontrado
        return res.status(404).send('Usuario no encontrado');
      }
    });
  });

app.listen(3306, () => {
  console.log('Servidor escuchando en el puerto 3306');
});