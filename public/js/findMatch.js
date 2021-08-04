import {API_KEY, SECRET} from './secrets.js'

let googleUserId;
let preference = null;
window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('Logged in as:', user.displayName);
        googleUserId = user.uid;
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};

const content = document.querySelector('#content')

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

const loadPreference = () => {
    return new Promise((resolve, reject) => {
        const preferenceRef = firebase.database().ref(`users/${googleUserId}/preferences/preference`);
        if (preferenceRef) {
            preferenceRef.on('value', (snapshot) => {
            const preference = snapshot.val();
            resolve(preference);
            });
        }
        else {
            reject(err);
        }
    });
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
    const preference = await loadPreference();
    const {data} = await axios.get(`https://api.petfinder.com/v2/animals?type=${preference}`, config)
    return data.animals;
  } catch (err) {
    console.log(err);
  }
}

const makeTag = (tag) => {
  return `<span class="tag is-success is-light">${tag}</span>`
}

let curAnimalIndex = 0;  
getData()
    .then((animalData) => {
        updateCurAnimal(animalData[0], animalData);   
    })

const updateCurAnimal = (animal, animalData) => {
    content.innerHTML = `
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img src='${animal.primary_photo_cropped ? animal.primary_photo_cropped.large : '../assets/dog-placeholder.png'}'/>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">${animal.name || '' }</p>
                  ${animal.breeds.primary || ''}</p>
                  <p>${animal.age || ''}  ${animal.gender || ''}</p>
                  <p>Size as Adult: ${animal.size || ''}</p>
                </div>
              </div>
                <div class="content">
                  ${animal.description ? animal.description : 'No description available'}
                </div>
                  ${animal.tags ? animal.tags.map(tag => makeTag(tag)) : ''}
                <div class="mt-4">
                  <button class="button is-pulled-left is-danger">
                    Left
                  </button>
                  <button class="button is-pulled-right is-info">
                    Right
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>`;

    const swipeRightBtn = document.querySelector('button.button.is-pulled-right');
    swipeRightBtn.addEventListener("click", () => {
        firebase.database().ref(`users/${googleUserId}/matches`).push(animalData[curAnimalIndex].id);
        updateCurAnimal(animalData[++curAnimalIndex], animalData);
    });

    const swipeLeftBtn = document.querySelector('button.button.is-pulled-left');
    swipeLeftBtn.addEventListener("click", () => {
        updateCurAnimal(animalData[++curAnimalIndex], animalData);
    });
}    


