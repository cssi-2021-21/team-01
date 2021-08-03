let googleUser = null;

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Signed in as", user.displayName);
            googleUser = user;
        }
        else {
            alert("Not signed in!");
            window.location = "signIn.html"
        }
    })
}

const dogBtn = document.querySelector('button[value="dog"]')
const catBtn = document.querySelector('button[value="cat"]')

dogBtn.addEventListener("click", () => {
    console.log("Dog Selected");
    window.location = "findMatch.html";
})

catBtn.addEventListener("click", () => {
    console.log("Cat Selected");
    window.location = "findMatch.html";
})

// add datebase preference saving