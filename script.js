const $darkButton = document.getElementById("dark-pic");
const $lightButton = document.getElementById("light-pic");
const $searchBar = document.querySelector("input");
const $button = document.querySelector("button");
const $avatar = document.getElementById("avatar-pic");
const $name = document.getElementById("name");
const $atName = document.getElementById("atName");
const $joined = document.getElementById("joined");
const $bio = document.getElementById("bio");
const $repos = document.getElementById("repos");
const $followers = document.getElementById("followers");
const $following = document.getElementById("following");
const $location = document.getElementById("location");
const $blog = document.getElementById("blog");
const $twitter = document.getElementById("twitter");
const $company = document.getElementById("company");
const $body = document.querySelector("body");
const $error = document.querySelector(".no-results");


const $lightMode = document.querySelector(".light-mode");
const $darkMode = document.querySelector(".dark-mode");



const changeMode = (mode) => {
    if(mode === "light") {
        $darkMode.style.display = "none"
        $lightMode.style.display = "flex"
        $body.classList.toggle("dark")
    }

    if (mode === "dark") {
        $lightMode.style.display = "none"
        $darkMode.style.display = "flex"
        $body.classList.toggle("dark")
    }
    
}

$darkButton.addEventListener("click", () => {changeMode("light")})
$lightButton.addEventListener("click", () => {changeMode("dark")})




$button.addEventListener("click", () => {
    getData($searchBar.value)
})

const getData = (accountName) => {
    fetch(`https://api.github.com/users/${accountName}`)
    .then(response => response.json())
    .then(data => {
        if(data.login) {
        console.log(data)

        $error.style.display = "none"

        $avatar.src = `${data.avatar_url}`
        $name.innerText =`${data.name}`
        $atName.innerText = `@${data.login}`
        $joined.innerText = displayTime(data.created_at)
        $bio.innerText = data.bio ? `${data.bio}` : "This profile has no bio"
        $repos.innerText = `${data.public_repos}`
        $followers.innerText = `${data.followers}`
        $following.innerText = `${data.following}`
        $location.innerText = data.location ? `${data.location}` : "Not available"
        if (data.blog) {
            $blog.href = `${data.blog}`
            $blog.innerText = `${data.blog}`
        } else {
            
            $blog.innerText = "Not available"
        }

        if (data.twitter_username){
            $twitter.href = `https://twitter.com/${data.twitter_username}`
            $twitter.innerText = `${data.twitter_username}`
            $twitter.parentElement.classList.remove("not-avaliable")
        } else {
            $twitter.href = `#`
            $twitter.innerText = "Not avaliable"
            $twitter.parentElement.classList.add("not-avaliable")
        }
    
        $company.innerText = data.company ? `${data.company}` : "Not available"
        } else {
            $error.style.display = "block"
        }
        

    })
}


const displayTime = (input) => {
   const splitInput = input.split("-")
   const year = splitInput[0]
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
   const month = months[splitInput[1] - 1]
   const day = splitInput[2].substr(0,2)

   return `Joined ${day} ${month} ${year}`
}