let googleUserId;

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

const dogBtn = document.querySelector('button[value="dog"]');
dogBtn.addEventListener("click", async function() {
    console.log('Dog Selected');
    await firebase.database().ref(`users/${googleUserId}`).update({preference: this.value});
    window.location = "explore.html";
});

const catBtn = document.querySelector('button[value="cat"]');
catBtn.addEventListener("click", async function() {
    console.log('Cat Selected');
    await firebase.database().ref(`users/${googleUserId}`).update({preference: this.value});
    window.location = "explore.html";
});