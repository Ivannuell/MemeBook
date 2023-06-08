// const item = document.querySelector('.item');
const author = document.querySelector(".owner");

const mainContent = document.querySelector(".main-contents");

function createAnotherItem(memeData, i) {
    const item = document.createElement("div");
    item.classList.add("content");
    item.innerHTML = `
        <div class="owner">/${memeData.memes[i].subreddit}</div>
        <div class="item"> <img src="${memeData.memes[i].url}"></div>
        <div class="visit-original"><a href="#">Visit original post</a></div>
    `;
    mainContent.appendChild(item);
}

let subReddits = ['memes', 'dankmemes', 'me_irl', 'terriblefacebookmemes'];
function randomNum() {
    return Math.floor(Math.random() * subReddits.length);
}


let apiLink = `https://meme-api.com/gimme/${subReddits[randomNum()]}/3`;
let count = 3;
function fetchMeme() {
    fetch(apiLink)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            for (let i = 0; i < count; i++) {
                createAnotherItem(data, i);
            }
        });
}

let lastScrollTop = 0;
mainContent.onscroll = (e) => {
    if (mainContent.scrollTop < lastScrollTop) {
        console.log('LastScrollTop: ', lastScrollTop);
        console.log('ScrollTop: ', mainContent.scrollTop);
        return;
    }

    lastScrollTop = mainContent.scrollTop <= 0 ? 0 : mainContent.scrollTop;
    if (
        mainContent.scrollTop + mainContent.offsetHeight >=
        (mainContent.scrollHeight - 100)
    ) {
        console.log("maxScrollHieght: ",mainContent.scrollHeight);
        apiLink = `https://meme-api.com/gimme/${subReddits[randomNum()]}/3`
        count = 1;
        fetchMeme();
        return;
    }
};

fetchMeme();
