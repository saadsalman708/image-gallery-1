const imagesDiv = document.querySelector(".images");
const loadBtn = document.querySelector(".load-btn");
const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".search-btn");
const special = document.querySelector(".special");

const apikey = "ZAEWtHlTYgw4QJ5Rj6YcJJ0iAJUK8IrTpD3PtFZGGMj0Uaa8UTk38vEy";

const perPage = 24;
let currentPage = 1;
let searchTerm = null;

let getImage = (apiUrl) => {
    loadBtn.textContent = "Loading..."
    loadBtn.setAttribute("disabled", true);
    fetch(apiUrl, {
        headers: { Authorization: apikey }
    }).then(res => res.json()).then(data => {
        generateHtml(data.photos);
        loadBtn.textContent = "Load More";
        loadBtn.removeAttribute("disabled");
    }).catch(()=> console.log("load unsuccessful API Failed!"));
};

getImage(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);


loadBtn.addEventListener("click", () => {
    currentPage++;
    // yaha apiUrl ko declare nahi kia huwa phir bhi chal raha hai. MAGIC
    apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    getImage(apiUrl);
});





let generateHtml = (images) => {
    if(searchTerm === null) {
        imagesDiv.innerHTML = special.innerHTML;
    } 

    imagesDiv.innerHTML += images.map(img =>
        `<li class="custom-card">
        <img src="${img.src.large2x}">
        <div class="details">
        <div class="name">
        <i class="fa-regular fa-camera"></i>
        <span>${img.photographer}</span>
        </div>
        <button class="btn download-btn">
        <i class="fa-solid fa-download"></i>
        </button>
        </div>
        </li>`
    ).join("");
};





function loadSearch() {

    let input = inputBox.value.trim();

    imagesDiv.innerHTML = "";

    if (input === "") {
        searchTerm = null;
        getImage(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
        return;
    }

    searchTerm = input;
    getImage(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
}





let checkSearch = (e) => {
    
    if (e.key === "Enter") {
        loadSearch();     
    }
};


inputBox.addEventListener("keyup" , checkSearch);
inputBox.addEventListener("blur" , loadSearch);
searchBtn.addEventListener("click" , loadSearch);