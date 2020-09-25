// Select Items from the DOM
const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmark-container');

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
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);
