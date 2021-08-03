let googleUserId

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
  

const dogBtn = document.querySelector('button[value="dog"]')
const catBtn = document.querySelector('button[value="cat"]')

dogBtn.addEventListener("click", () => {
    console.log("Dog Selected");
    firebase.database().ref(`/users/${googleUser}/preferences`).update({preference: 'dog'});
    window.location = "explore.html";
});

catBtn.addEventListener("click", () => {
    console.log("Cat Selected");
    firebase.database().ref(`/users/${googleUser}/preferences`).update({preference: 'cat'});
    window.location = "explore.html";
});