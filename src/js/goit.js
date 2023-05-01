import Notiflix from 'notiflix';

export const gallery = document.querySelector(".gallery");
export const searchInput = document.querySelector(".search-input");
export const searchForm = document.querySelector(".search-form");
export const loadMore = document.querySelector(".load-more");

export async function fetchImages (api) {
    try{
        const images = await fetch(api);
        const response = await images.json();
        return response;
    } catch (error) {
        return Notiflix.Notify.failure("error with API");
    }
}

export let page = 1;
export let per_page = 40;

export function renderImages(images) {
    if(images == ""){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    else{
        page += 1;
        loadMore.style.display = 'block';

        images.forEach(image => {
            gallery.insertAdjacentHTML("afterbegin", 
            `<div class="photo-card">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                <div class="info">
                    <div class="info-item">
                        <p class='title' >Likes</p>
                        <p>${image.likes}</p>
                    </div>
                    <div class="info-item">
                        <p class='title'>Views</p>
                        <p>${image.views}</p>
                    </div>
                    <div class="info-item">
                        <p class='title'>Comments</p>
                        <p>${image.comments}</p>
                    </div>
                    <div class="info-item">
                        <p class='title'>Downloads</p>
                        <p>${image.downloads}</p>
                    </div>
                </div>
            </div>
            `)
        })
    }
}

export function addImages(images) {
    page += 1;

    images.forEach(image => {
        gallery.insertAdjacentHTML("beforeend", 
        `<div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <div class="info-item">
                    <p class='title' >Likes</p>
                    <p>${image.likes}</p>
                </div>
                <div class="info-item">
                    <p class='title'>Views</p>
                    <p>${image.views}</p>
                </div>
                <div class="info-item">
                    <p class='title'>Comments</p>
                    <p>${image.comments}</p>
                </div>
                <div class="info-item">
                    <p class='title'>Downloads</p>
                    <p>${image.downloads}</p>
                </div>
            </div>
        </div>
        `)
    })
}

export function calculateImages(images) {
    const total = Math.ceil(images/per_page) + 1;
    if(total < page){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        loadMore.style.display = 'none';
    }
}

export function renderHits(images){
    if(images === 0){
        return;
    }
    Notiflix.Notify.info(`"Hooray! We found "${images} images.`);
}