const axios = require('axios');
const { subscriptionKey } = require('secrets');

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
