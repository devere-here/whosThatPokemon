const axios = require('axios');
const subscriptionKey = '12e9090417c34b9398c3ce156e5c0dc2';


const getImages = (searchTerm) => {

  return axios({
    url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search',
    headers: { 'Ocp-Apim-Subscription-Key' : subscriptionKey },
    params: {
      count: 3,
      q: encodeURIComponent(searchTerm)
    },
  })
  .then(res => {
    const { value: apiData } = res.data;
    return apiData.map(image => {
      return image.thumbnailUrl
    });
  })
  .catch(err => console.log('err is', err))
}

module.exports = getImages;
