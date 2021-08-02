import {API_KEY, SECRET} from './secrets.js'

const content = document.querySelector('#content')
console.log(content);

const getAuthToken = async () => {
  const res = await axios.request({
    method: "post",
    url: "https://api.petfinder.com/v2/oauth2/token",
    data: {
      "grant_type": "client_credentials",
      "client_id": API_KEY,
      "client_secret": SECRET
    }
  })
  return res.data.access_token
}

async function getData() {
  const OAUTH_TOKEN = await getAuthToken()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OAUTH_TOKEN}`
    },
  };

  try {
    const {data} = await axios.get('https://api.petfinder.com/v2/animals?type=dog', config)
    const animal = data.animals[0]
    console.log(animal);
    content.innerHTML = `
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="card">
              <div class="card-image">
                  <figure class="image">
                  ${animal.primary_photo_cropped ? `<img src='${animal.primary_photo_cropped.large}'/>` : false} 
                  </figure>
              </div>
              <div class="card-content">
                  <div class="media">
                  <div class="media-content">
                      <p class="title is-4">${animal.name}</p>
                      <p class="is-6">${animal.gender}</p>
                      <p class="is-6">${animal.breeds.primary}</p>
                      <p class="subtitle is-6">${animal.age}</p>
                  </div>
                  </div>
                  <div class="content">
                  ${animal.description ? animal.description : 'No description available'}
                  </div>
              </div>
          </div>
      </div>`
  } catch (err) {
    console.log(err);
  }
}

getData()

