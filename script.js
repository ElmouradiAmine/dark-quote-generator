const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const authorImage = document.getElementById('author-image');
const totalRequestsText = document.getElementById('total-requests-value');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get Quote from API
async function getQuote() {
    totalRequestsText.innerText++;
    showLoadingSpinner();
    const apiUrl = 'https://quote-generator-api2020.herokuapp.com/api/quotes/random';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        //If author is black add unknown.
        if (data.author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.author;
        }
        // Reduce font size for long quotes
        if (data.content > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.content;
        authorImage.setAttribute('src', data.imageUrl);
        // Stop loader, show the quote
        hideLoadingSpinner();

    } catch (error) {
        //getQuote();
        console.log('Whoops, no quote', error);
    }
}

//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank'); //Open the url in a new window
}

// Get inasynczfo about api
async function getInfoAboutApi() {
    const apiUrl = 'https://quote-generator-api2020.herokuapp.com/api/info';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        totalRequestsText.innerText = data.totalRequests;

    } catch (error) {
        const response = await fetch(apiUrl);
        const data = await response.json();
    }
}
// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getInfoAboutApi();
getQuote();