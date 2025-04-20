const sharp = require("sharp");

const images = [
  "assets/images/compressed/pan2.webp",
  "assets/images/compressed/slide1.webp",
  "assets/images/compressed/slide2.webp",
  "assets/images/compressed/veranda.webp"
];

images.forEach(image => {
  sharp(image)
    .webp({ quality: 75, effort: 6 })
    .toFile(image.replace("compressed", "temp"))
    .then(info => console.log(`Ottimizzato ${image}: ${info.size} bytes`))
    .catch(err => console.error(`Errore con ${image}:`, err));
});
