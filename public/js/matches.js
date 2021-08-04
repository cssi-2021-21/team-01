let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getCards(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};

const getCards = (userId) => {
    const matchRef = firebase.database().ref(`users/${userId}/matches`);
    matchRef.on("value", (snapshot) => {
        const data = snapshot.val();
        renderDataAsHTML(data);
    })
}

const renderDataAsHTML = (data) => {
    let cards = ``;
    for (const matchItem in data) {
        const match = data[matchItem];
        // For each match create a card
        cards += createCard(match);
    };
    document.querySelector("#cards").innerHTML = cards;
}

const createCard = (animal) => {
    return `<div class="column is-one-quarter">
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
            </div>
          </div>
        </div>`
}

const makeTag = (tag) => {
  return `<span class="tag is-success is-light">${tag}</span>`
}