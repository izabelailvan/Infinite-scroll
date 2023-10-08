const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];
let initialLoad=true;

// Unsplash API
const count=30;
const apiKey='h5QNACnu7jap-YH0g3FrrZEDrfmP3iB06Z9XhYU6hMI';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden=true; //only when images are loaded
        initialLoad=false;
    }
}

//Helper Function to Set Sttributes on DOM elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

/* Create elements for links and photos, Add to DOM */
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item=document.createElement('a'); //create a blank anchore element
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        //Create image for photo
        const img =document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put the image inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

/* Get Photos from Unsplash API */

async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        } catch(error){
        //Catch error here
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//On Load
getPhotos();
