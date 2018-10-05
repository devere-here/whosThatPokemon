const rp = require('request-promise');
const baseUrl = 'https://pokemondb.net'
const typeExtension = '/type/fire';
const $ = require('cheerio');
const sharp = require('sharp');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var PImage = require('pureimage');
const fs = require('fs');
const download = require('image-downloader');



rp(baseUrl + typeExtension)
.then(function(html){
  //success!
  const pokemonNames = $('a[class="ent-name"]', html);
  const length = Object.keys(pokemonNames).length

  let count = 0;

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
          count++
        }
      }
      console.log('saur!!!', spriteUrls);

      return {
        spriteUrls,
        pokemonName
      }
    })
    .then(({ spriteUrls, pokemonName }) => {
      load(spriteUrls, pokemonName)
    })

  }

})
.catch(function(err){
  //handle error
});


const load = (imageArray, name) => {
  console.log('in load');
  // const dom = new JSDOM("<div><img src='https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/charizard-mega-y.png' /><canvas /></div>");
  // const ctx = dom.window.document.querySelector("canvas").getContext('2d');
  // const imgRequest = new Promise((resolve, reject) => {
  //   //img.src = 'https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/charizard-mega-y.png';
  //   console.log('in the imgRequest');
  // })

  fs.mkdirSync(`.${typeExtension}/${name}`)

  imageArray.forEach((url, idx) => {
    const options = {
      url: url,
      dest: `./${name}/${idx}.png`
    }

    download.image(options)
    .then(({ filename }) => {
      console.log('File saved to', filename)
    })
    .catch((err) => {
      console.error(err)
    })

  })






  // axios.get('https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/charizard-mega-y.png')
  // .then(data => {
  //   console.log('mega charizard', data.data);
  //   console.log('typeof', typeof data.data);
  //   PImage.encodePNGToStream(data, fs.createWriteStream('vans.png')).then(() => {
  //     console.log("wrote out the png file to vans.png");
  //   }).catch((e)=>{
  //       console.log("there was an error writing");
  //   });

  // })

  // PImage.decodeJPEGFromStream(fs.createReadStream("test.jpg"))
  // .then((img) => {

  //   PImage.encodePNGToStream('', fs.createWriteStream('stuff.png')).then(() => {
  //     console.log("wrote out the png file to out.png");
  //   }).catch((e)=>{
  //       console.log("there was an error writing");
  //   });
  // })

  // PImage.decodeJPEGFromStream(fs.createReadStream("output.jpg"))
  // .then((img) => {

  //   var img2 = PImage.make(50,50);
  //   var c = img2.getContext('2d');
  //   c.drawImage(img,
  //       0, 0, img.width, img.height,
  //       0, 0, 50, 50
  //   )

  //   const imgData = c.getImageData(0, 0, 50, 50)
  //   console.log('imgData', imgData.data, 'imgData.data.length', imgData.data.length);
  // })

}
