let googleUserId

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};

const cards = document.querySelector("#cards");

const makeTag = (tag) => {
  return `<span class="tag is-success is-light">${tag}</span>`
}

const dummyData = [
    {
        name: "Barry",
        breed: "Rotweiler",
        age: "14",
        gender: "Male",
        size: "Medium",
        description: "A cool dog",
        tags: ["Friendly", "Affectionate", "Cheerful"]
    },
    {
        name: "Tim",
        breed: "Golden Retreiver",
        age: "10",
        gender: "Male",
        size: "Large",
        description: "A fancy dog",
        tags: ["Cool", "Smart", "Cheerful"]
    },
    {
        name: "Margaret",
        breed: "Pitbull",
        age: "5",
        gender: "Female",
        size: "Small",
        description: "A dog",
        tags: ["Cool"]
    },
    {
        name: "Tim",
        breed: "Golden Retreiver",
        age: "10",
        gender: "Male",
        size: "Large",
        description: "A fancy dog",
        tags: ["Cool", "Smart", "Cheerful"]
    },{
        name: "Tim",
        breed: "Golden Retreiver",
        age: "10",
        gender: "Male",
        size: "Large",
        description: "A fancy dog",
        tags: ["Cool", "Smart", "Cheerful"]
    },{
        name: "Tim",
        breed: "Golden Retreiver",
        age: "10",
        gender: "Male",
        size: "Large",
        description: "A fancy dog",
        tags: ["Cool", "Smart", "Cheerful"]
    },{
        name: "Tim",
        breed: "Golden Retreiver",
        age: "10",
        gender: "Male",
        size: "Large",
        description: "A fancy dog",
        tags: ["Cool", "Smart", "Cheerful"]
    },{
        name: "Tim",
        breed: "Golden Retreiver",
        age: "10",
        gender: "Male",
        size: "Large",
        description: "A fancy dog",
        tags: ["Cool", "Smart", "Cheerful"]
    },
    {
        name: "Tim",
        breed: "Golden Retreiver",
        age: "10",
        gender: "Male",
        size: "Large",
        description: "A fancy dog",
        tags: ["Cool", "Smart", "Cheerful"]
    }
]

dummyData.forEach(animal => {
    cards.innerHTML += `<div class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img src='${'/assets/dog-placeholder.png'}'/>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">${animal.name}</p>
                  ${animal.breed}</p>
                  <p>${animal.age}  ${animal.gender}</p>
                  <p>Size as Adult: ${animal.size || ''}</p>
                </div>
              </div>
                <div class="content">
                  ${animal.description}
                </div>
                  ${animal.tags ? animal.tags.map(tag => makeTag(tag)) : ''}
            </div>
          </div>
        </div>`
});