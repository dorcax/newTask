const searchform = document.querySelector(".city")
const search = document.querySelector("input")
searchform.addEventListener("submit", (e) => {
    e.preventDefault()
    searchvalue =search.value
    console.log(searchvalue)
})
