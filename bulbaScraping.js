const rp = require('request-promise');
const baseUrl = 'https://pokemondb.net'
const typeExtension = '/type/grass';
const $ = require('cheerio');


rp(baseUrl + typeExtension)
.then(function(html){
  //success!
  const pokemonExtension = $('.infocard-md-data > a', html)[0].attribs.href;
  console.log('bulbasaur', $('.infocard-md-data > a', html)[0].attribs.href)

  rp(baseUrl + pokemonExtension)
  .then(function(html){
    const images = $('a[class="sprite-share-link "]', html);
    const spriteUrls = [];

    for (let i = 0; i < images.length; i++){
      const url = images[i].attribs.href;
      if (!url.includes('red-blue') && !url.includes('x-y')){
        spriteUrls.push(url)
      }
    }

    console.log('saur!!!', spriteUrls);

  })

})
.catch(function(err){
  //handle error
});