const shell = require('shelljs');
const sharp = require('sharp');

const pokemonTypes = ['fire', 'water']

for (let i = 0; i < pokemonTypes.length; i++){
  shell.ls(`./type/${pokemonTypes[i]}`).forEach((file) => {
    console.log(`./type/${pokemonTypes[i]}/${file}`)
    shell.ls(`./type/${pokemonTypes[i]}/${file}`).forEach(image => {
      sharp(`./type/${pokemonTypes[i]}/${file}/${image}`)
      .resize(50, 50)
      .toFile(`./type/${pokemonTypes[i]}/${file}/resized${image}`)
    })
  })
}
