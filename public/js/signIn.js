const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then(async (result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        await firebase.database().ref(`/users/${user.uid}`).update({name: `${result.additionalUserInfo.profile.name}`});
        console.log(result.additionalUserInfo.profile.name);        

    })
    .then(() => {
        window.location = 'preferenceInitial.html';
    })  
    .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    const err = {
      errorCode,
      errorMessage,
      email,
      credential
    };
    console.log(err);
  });
}