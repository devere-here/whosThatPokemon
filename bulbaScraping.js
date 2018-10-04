const rp = require('request-promise');
const baseUrl = 'https://pokemondb.net'
const typeExtension = '/type/grass';
const $ = require('cheerio');
const sharp = require('sharp');


rp(baseUrl + typeExtension)
.then(function(html){
  //success!
  const pokemonNames = $('a[class="ent-name"]', html);
  const length = Object.keys(pokemonNames).length

  for (let i = 0; i < length; i++){
    const pokemonName = $('a[class="ent-name"]', html)[i].children[0].data;

    rp(baseUrl + '/sprites/' + pokemonName)
    .then(function(html){
      const images = $('a[class="sprite-share-link "]', html);
      const spriteUrls = [];

      for (let i = 0; i < images.length; i++){
        const url = images[i].attribs.href;
        if (!url.includes('shiny') && !url.includes('red-blue') && !url.includes('yellow')){
          spriteUrls.push(url)
        }
      }
      console.log('saur!!!', spriteUrls);
    })

  }

})
.catch(function(err){
  //handle error
});