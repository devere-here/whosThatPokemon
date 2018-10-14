const rp = require('request-promise');
const baseUrl = 'https://pokemondb.net'
const $ = require('cheerio');


const getPokemonImages = (pokemonName, type) => {
  rp(baseUrl + '/sprites/' + pokemonName)
  .then(function(html){
    const images = $('a[class="sprite-share-link "]', html);
    const spriteUrls = [];

    images += images.length;

    for (let i = 0; i < images.length; i++){
      const url = images[i].attribs.href;
      if (!url.includes('shiny') && !url.includes('red-blue') && !url.includes('yellow')){
        spriteUrls.push(url)
      }
    }

    return {
      spriteUrls,
      pokemonName
    }
  })
  .then(({ spriteUrls, pokemonName }) => {
    (saveImagesLocally(spriteUrls, pokemonName, type))(spriteUrls, pokemonName, type)
  })

}


const getPokemonOfType = (type) => {
  rp(`${baseUrl}/type/${type}`)
  .then(function(html){

    const pokemonNames = $('a[class="ent-name"]', html);
    const length = Object.keys(pokemonNames).length

    for (let i = 0; i < length; i++){
      const pokemonName = $('a[class="ent-name"]', html)[i].children[0].data;
      getPokemonImages(pokemonName, type);
    }

  })
  .catch(function(err){
    console.log(err);
  });

}

const pokemonTypes = ['fire', 'water'];

pokemonTypes.forEach(type => {
  getPokemonOfType(type)
})
