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
