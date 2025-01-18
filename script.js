const starContainer = document.getElementById("star-container");
const polaroidContainer = document.getElementById("polaroid-container");
const polaroid = document.getElementById("polaroid");

//photos and messages behind each photo
const photos = [
    {img: "photo1.jpg", note: "message behind the photo"},
    {img: "photo2.jpg", note: "message behind the photo"},
];

let shuffledPhotos = [];
let currentIndex = 0;

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize shuffled photos
function initializePhotos() {
    shuffledPhotos = shuffleArray([...photos]); // Copy the photos array and shuffle it
    currentIndex = 0;
}

// Get the next photo in the sequence
function getNextPhoto() {
    if (currentIndex >= shuffledPhotos.length) {
        initializePhotos(); // Reshuffle when all photos are shown
    }
    return shuffledPhotos[currentIndex++];
}

//create floating stars
function createStars(){
    for(let i = 0; i < 150; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDuration = Math.random() * 1 + 1  + "s";

        star.style.setProperty("--random-x", Math.random());
        star.style.setProperty("--random-y", Math.random());

        starContainer.appendChild(star);

        star.addEventListener("click", () => openNextPhoto());
    }
}

//Open random photo in Polaroid
function openNextPhoto(){
    const nextPhoto = getNextPhoto();
    polaroid.querySelector(".front img").src = nextPhoto.img;
    polaroid.querySelector(".back p").innerHTML = nextPhoto.note;

    polaroidContainer.style.display = "block";
    polaroid.style.transform = "rotateY(0deg)";
}

//Flip polaroid on click
polaroid.addEventListener("click", () => {
    const isFlipped = polaroid.style.transform === "rotateY(180deg)";
    polaroid.style.transform = isFlipped ? "rotateY(0deg)" : "rotateY(180deg)";
});

//Initialize stars
initializePhotos();
createStars();