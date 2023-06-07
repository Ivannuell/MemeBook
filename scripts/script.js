const item = document.querySelector('.item');
const owner = document.querySelector('.owner');

function createAnotherItem() {
    const item = document.createElement('div');
    item.classList.add('item');
    return item;
}


fetch('https://meme-api.com/gimme/4')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        item.innerHTML = `<img src="${data.memes[0].url}">`;
        owner.innerHTML = `<p>Owner: ${data.memes[0].author}</p>`;
    })