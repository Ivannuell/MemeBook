const author = document.querySelector(".owner");

const mainContent = document.querySelector(".main-contents");
const filterCon = document.querySelector(".filter-choice");
let subReddits = [
    "memes",
    "dankmemes",
    "me_irl",
    "terriblefacebookmemes",
    "PampamilyangPaoLUL",
];

let filteredSubReddits = [
    "memes",
    "dankmemes",
    "me_irl",
    "terriblefacebookmemes",
    "PampamilyangPaoLUL",
];

function randomNum() {
    return Math.floor(Math.random() * subReddits.length);
}

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

// function createAnotherFilter(subreddit) {
//     const filter = document.createElement("div");
//     filter.classList.add("choices");
//     filter.innerHTML = `
//         <button onclick="check()" class="filter-bttn">/${subreddit}</button>
//     `;
//     filterCon.appendChild(filter);
// }

let apiLink = `https://meme-api.com/gimme/${
    filteredSubReddits[rando(filteredSubReddits.length)]
}/3`;
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
        console.log("LastScrollTop: ", lastScrollTop);
        console.log("ScrollTop: ", mainContent.scrollTop);
        return;
    }

    lastScrollTop = mainContent.scrollTop <= 0 ? 0 : mainContent.scrollTop;
    if (
        mainContent.scrollTop + mainContent.offsetHeight >=
        mainContent.scrollHeight - 160
    ) {
        console.log("maxScrollHieght: ", mainContent.scrollHeight);
        apiLink = `https://meme-api.com/gimme/${filteredSubReddits[rando(filteredSubReddits.length)]}/3`;
        count = 3;
        fetchMeme();
        return;
    }
};

function fillFilteredSubReddits() {
    filteredSubReddits.forEach((text, index) => {
        const button = document.createElement("button");
        button.classList.add("filter-bttn");
        button.innerHTML = text;
        button.dataset.index = index; // Assign a unique index to each button
        filterCon.appendChild(button);
    });
}

fillFilteredSubReddits();

filterCon.addEventListener("click", function (event) {
    
    if (event.target.tagName === "BUTTON") {
        const button = event.target;
        const innerText = button.innerHTML;
        const buttonIndex = button.dataset.index;
        console.log("Button Text:", innerText);
        console.log("Button Index:", buttonIndex);

        filterCon.removeChild(button);
        filteredSubReddits = filteredSubReddits.filter((element) => element !== innerText);
        console.log(filteredSubReddits);
        while(mainContent.firstChild){
            mainContent.removeChild(mainContent.firstChild);
        }
        count = 3;
        fetchMeme();
    }
});
fetchMeme();
