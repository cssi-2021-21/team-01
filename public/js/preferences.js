let googleUser;

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Signed in as", user.displayName);
            googleUser = user.uid;
            firebase.database().ref(`/users/${googleUser}/preferences`).push({preference: null});
        }
        else {
            alert("Not signed in!");
            window.location = "index.html";
        }
    })
}

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