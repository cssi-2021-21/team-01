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

let dummyData = [
    {
        name: "Barry",
        breed: "Rotweiler",
        age: "14",
        gender: "Male"
    }
]