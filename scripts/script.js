// const item = document.querySelector('.item');
const author = document.querySelector('.owner');

const mainContent = document.querySelector('.main-contents');
let memeData;

function createAnotherItem(memeData, i) {
    const item = document.createElement('div');
    item.classList.add('content');
    item.innerHTML = `
        <div class="owner">/${memeData.memes[i].author}</div>
        <div class="item"> <img src="${memeData.memes[i].url}"></div>
        <div class="visit-original"><a href="#">Visit original post</a></div>
    `
    mainContent.appendChild(item);
}

async function fetchMeme() {
    await fetch('https://meme-api.com/gimme/5')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            for (let i = 0; i < 10; i++) {
                createAnotherItem(data, i);
            }
            
        })

}


mainContent.onscroll = function() {
    var distanceScrolled = mainContent.scrollTop;
    console.log(distanceScrolled);
    if (distanceScrolled < (121)) {
      fetchMeme();
    }
}

fetchMeme();



