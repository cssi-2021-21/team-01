import {API_KEY, SECRET} from './secrets.js'

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
    console.log(data)
  } catch (err) {
    console.log(err);
  }
}

getData()

