console.log('hi')
const API_KEY = '';
const SECRET = ''

const getAuthTokenAPI = () => {
  // figure out how to return the OAuth Token
}

async function getData() {
  const OAUTH_TOKEN = getAuthTokenAPI()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OAUTH_TOKEN}`
    },
  };

  try {
    const res = await axios.get('https://api.petfinder.com/v2/animals?type=dog', config)
    console.log(res)
  } catch (err) {
    console.log(err);
  }
}

getData()

