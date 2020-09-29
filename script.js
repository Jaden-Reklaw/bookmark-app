// Select Items from the DOM
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmark-container');
let bookmarks = [];

// Show modal, focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

function closeModal() {
    modal.classList.remove('show-modal');
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false))

// Validate Form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    // Validate fields are filled
    if(!nameValue || !urlValue) {
        alert('Please provide values for both fields.');
        return false;
    }

    // Validate the url is correct
    if (!urlValue.match(regex)) {
        alert('Please provide a valid url address.');
        return false;
    }

    // Validate if passed all test
    return true;
}

// Function that builds the bookmarks and places them in the bookmark-container
function buildBookmarks() {
    // Build items
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-window-close');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        //Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        //Append to Bookmarks Container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarkContainer.appendChild(item);
    })
}
// Fetch Bookmarks from localStorage
function fetchBookmarks() {
    // Get bookmarks from localStorage if available
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = [
        {
            name: 'Google',
            url: 'https://google.com'
        },       
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // Run function to render to DOM
    buildBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault();
    //Somehow the event shows the value after clicking
    //websiteNameEl and websiteUrlEl are just the input elements
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    
    //If validate returns false this statement is true thus returning false and not executing the code under
    if(!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    //Send bookmarks to array
    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteUrlEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
