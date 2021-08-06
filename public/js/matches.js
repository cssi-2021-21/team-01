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
        cards += createCard(match, matchItem);
    };
    document.querySelector("#cards").innerHTML = cards;
}

const deleteAnimal = (animalId) => {
    firebase.database().ref(`users/${googleUserId}/matches/${animalId}`).remove();
}

const formatAddress = (contactData) => {
    const addressText = document.getElementById('addressText');
    const emailText = document.getElementById('emailText');
    const phoneNumberText = document.getElementById('phoneNumberText');

    if (contactData.address) {
        const addressArr = Object.values(contactData.address);
        let addressLine = addressArr[0];
        for (let i = 1; i < addressArr.length - 1; i++) {
            addressLine += `, ${addressArr[i]}`;
        }
        addressText.textContent = addressLine;
    }

    emailText.textContent = contactData.email ? contactData.email : "n/a";
    phoneNumberText.textContent = contactData.phone ? contactData.phone : "n/a";
}

const openContactModal = (animalId) => {
    const contactModal = document.getElementById('contactModal');
    const contactRef = firebase.database().ref(`users/${googleUserId}/matches/${animalId}/contact`);
    contactRef.on("value", (snapshot) => {
        const data = snapshot.val();
        formatAddress(data);
    });
    // Open Modal
    contactModal.classList.toggle('is-active');
    
}


const closeContactModal = () => {
    const contactModal = document.getElementById('contactModal');
    contactModal.classList.toggle('is-active');
}

const createCard = (animal, animalId) => {
    return `
    <div class="column is-one-fifth">
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img src='${animal.primary_photo_cropped ? animal.primary_photo_cropped.large : `../assets/${animal.species.toLowerCase()}-placeholder.png`}'/>
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
      <footer class="card-footer">
        <a class="card-footer-item" onclick="openContactModal('${animalId}')">
            Contact
        </a>
        <a class="card-footer-item" onclick="deleteAnimal('${animalId}')">
            Delete
        </a>
      </footer>
    </div>
  </div>`
}

const makeTag = (tag) => {
  return `<span class="tag is-success is-light">${tag}</span>`
}
