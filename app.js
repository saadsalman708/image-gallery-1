const apikey = "713uufW4FDq34h1qTs7UKSYPNRujJ9dtg4pmBuWsZumhh9u798DT5vK5";

const  perPage = 24;
let currentPage = 1;

let getimage = (apiUrl) => {
    fetch(apiUrl , {
        headers: {Authorization: apikey}
    }).then(res => res.json()).then(data => {
        console.log(data);
    })
};

getimage(`https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`)




