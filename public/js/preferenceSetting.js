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
  
const onSubmit = e => {
  const species = document.getElementById('species').value.toLowerCase();
  const onlyPictures = document.getElementById('onlyPictures').value.toLowerCase();
  firebase.database().ref(`/users/${googleUserId}`).update({preference: species})
  firebase.database().ref(`/users/${googleUserId}`).update({onlyPictures: onlyPictures})
  alert('Preferences changed.')
}
