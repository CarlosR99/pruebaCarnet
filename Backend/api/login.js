db.query(query, [codigo, password], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
  
    if (results.length > 0) {
      // Usuario encontrado, ahora compara las imágenes
      const usuario = results[0];
  
      // La imagen se almacena en usuario.imagen
      const img2 = cv.imdecode(usuario.imagen); // Decodifica la imagen
  
      // El resto de tu código de manejo de ruta aquí
    } else {
      // Usuario no encontrado
      return res.status(404).send('Usuario no encontrado');
    }
  });