const express = require('express');
const multer = require('multer');

const photoUpload = express.Router()

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload-photos', upload.array('photos'), (req, res) => {
  const photos = req.files;

  // Do any necessary validation or processing of the uploaded photos here

  // Move the uploaded photos to a folder on your server
  for (let i = 0; i < photos.length; i++) {
    const photoPath = photos[i].path;
    const newPhotoPath = `photos/${photos[i].originalname}`;
    fs.rename(photoPath, newPhotoPath, (err) => {
      if (err) {
        console.error('Error moving photo:', err);
      } else {
        console.log('Photo uploaded:', newPhotoPath);
      }
    });
  }

  res.status(200).send('Photos uploaded successfully');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});