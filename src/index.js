import * as goitHw from "./js/goit.js";

goitHw.searchForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    goitHw.fetchImages(`https://pixabay.com/api/?key=35594812-0318ae570b601c4a3427f19fb&q=${goitHw.searchInput.value.toLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${goitHw.per_page}`)
    .then(images => {
        goitHw.page = 1;
        goitHw.gallery.replaceChildren([]);
        goitHw.renderImages(images["hits"]);
        goitHw.renderHits(images["totalHits"]);
    })  
})

goitHw.loadMore.addEventListener("click", (event)=>{
    event.preventDefault();
    goitHw.fetchImages(`https://pixabay.com/api/?key=35594812-0318ae570b601c4a3427f19fb&q=${goitHw.searchInput.value.toLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${goitHw.per_page}&page=${goitHw.page}`)
    .then(images => {
        goitHw.addImages(images["hits"]);
        goitHw.calculateImages(images["totalHits"]);
    })  
})
