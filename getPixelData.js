const shell = require('shelljs');
const PImage = require('pureimage');
const fs = require('fs');


const pokemonTypes = ['fire', 'water'];
const fireData = [];
const waterData = [];


for (let i = 0; i < pokemonTypes.length; i++){
  shell.ls(`./type/${pokemonTypes[i]}`).forEach((file) => {
    shell.ls(`./type/${pokemonTypes[i]}/${file}`).forEach(image => {
      PImage.decodePNGFromStream(fs.createReadStream(`type/${pokemonTypes[i]}/${file}/${image}`))
      .then((img) => {

        var img2 = PImage.make(50,50);
        var c = img2.getContext('2d');
        c.drawImage(img,
            0, 0, img.width, img.height,
            0, 0, 50, 50
        )

        const imgData = c.getImageData(0, 0, 50, 50)

        if (pokemonTypes[i] === 'fire') fireData.push(imgData.data)
        else waterData.push(imgData.data)
      })
    })
  })
}
