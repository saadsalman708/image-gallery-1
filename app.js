const imagesDiv = document.querySelector(".images");
const loadBtn = document.querySelector(".load-btn");

const apikey = "ZAEWtHlTYgw4QJ5Rj6YcJJ0iAJUK8IrTpD3PtFZGGMj0Uaa8UTk38vEy";

const perPage = 24;
let currentPage = 1;

let getimage = (apiUrl) => {
    loadBtn.textContent = "Loading..."
    loadBtn.setAttribute("disabled" , true);
    fetch(apiUrl, {
        headers: { Authorization: apikey }
    }).then(res => res.json()).then(data => {
        generateHtml(data.photos);
        loadBtn.textContent = "Load More";
        loadBtn.removeAttribute("disabled");
    })
};

getimage(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);


loadBtn.addEventListener("click" , () => {
    currentPage++;
    apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    getimage(apiUrl);
});



let generateHtml = (images) => {
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