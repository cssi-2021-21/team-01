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
  const species = document.querySelector('#species').value.toLowerCase()
  firebase.database().ref(`/users/${googleUserId}/preferences`).update({preference: species})
  alert('Preferences changed.')
}
