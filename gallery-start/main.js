const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageArray = ['gallery-start/images/pic1.jpg', 'gallery-start/images/pic2.jpg', 'gallery-start/images/pic3.jpg', 'gallery-start/images/pic4.jpg','gallery-start/images/pic5.jpg'];

/* Declaring the alternative text for each image file */

const altTexts = {
    'gallery-start/images/pic1.jpg': 'Image 1 description',
    'gallery-start/images/pic2.jpg': 'Image 2 description',
    'gallery-start/images/pic3.jpg': 'Image 3 description',
    'gallery-start/images/pic4.jpg': 'Image 4 description',
    'gallery-start/images/pic5.jpg': 'Image 5 description'
}
/* Looping through images */
for (let i = 0; i < imageArray.length; i++) {
    const newImage = document.createElement('img');
    const src = `gallery-start/images/${imageFilenames[i]}`;
    const alt = altTexts[imageFilenames[i]];
    
    newImage.setAttribute('src', src);
    newImage.setAttribute('alt', alt);
    thumbBar.appendChild(newImage);

/* Adding a click event listener to each thumbnail image */
    newImage.addEventListener('click', (e) => {
        displayedImage.setAttribute('src', e.target.getAttribute('src'));
        displayedImage.setAttribute('alt', e.target.getAttribute('alt'));
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const currentclass = btn.getAttribute('class');
    if (currentclass === 'dark') {
        btn.setAttribute('class', 'light');
        overlay.style.backgrouncolor = 'rgba(0, 0, 0, 0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgrouncolor = 'rgba(0, 0, 0, 0)';
    }
});
