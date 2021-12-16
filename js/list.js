let arrayFromLocal = JSON.parse(localStorage.getItem('arrayWithProducts'));
let wrapper = document.createElement('div');
wrapper.style.cssText = 'display:flex; max-width:1100px;margin:0 auto;gap:15px;padding:15px;flex-wrap:wrap; justify-content:space-around;'
let removeButton = document.createElement('button');
removeButton.innerText = 'Видалити усі товари та очистити локальне сховище';
removeButton.style.cssText = 'width:100%;height:90px;background:red;cursor:pointer;font-size:24px';
removeButton.onclick = function() {
    document.body.innerText = ''
    wrapper.innerText = 'НЕ ДОДАНО ЖОДНОГО ТОВАРУ'
    document.body.appendChild(wrapper)
    localStorage.removeItem('arrayWithProducts')
}

let removeItemFromLocal = (id) => {
    let itemsFromLocal = JSON.parse(localStorage.getItem('arrayWithProducts'));
    let arrayWithoutItem = itemsFromLocal.filter(item => item.id !== id);
    if (arrayWithoutItem.length > 0) {
        localStorage.setItem('arrayWithProducts', JSON.stringify(arrayWithoutItem));
    } else {
        localStorage.removeItem('arrayWithProducts')
    };
    let card = document.getElementById(id);
    let disabledCard = document.createElement('div');
    disabledCard.style.cssText = 'position:absolute; top:0;left:0; width:199px;height:349px;background-color:rgba(247, 0, 0,0.3);border-radius:5px';
    card.appendChild(disabledCard)
};

let createGoodsCard = (url, title, prise, quantity, description, id) => {
    let card = document.createElement('div');
    card.id = id;
    card.style.cssText = 'border:1px solid black; margin:0 auto; width:200px; height:350px;padding:15px;border-radius:5px; position:relative; box-sizing:border-box;';
    let cardTitle = document.createElement('h2');
    cardTitle.style.cssText = 'text-align:center;margin:10px';
    let cardPrise = document.createElement('p');
    cardPrise.style.cssText = 'text-align:center;margin:10px';
    let descriptionBlock = document.createElement('p');
    descriptionBlock.style.cssText = 'text-align:center;margin:10px';
    let cardImage = document.createElement('div');
    cardImage.style.cssText = `width:100%;height:150px; background :no-repeat center/contain url('${url}');background-color:rgba(23, 78, 166,0.1);border-radius:5px`;
    let cardQuantity = document.createElement('p');
    cardQuantity.style.cssText = 'text-align:center;margin:10px';
    let button = document.createElement('button');
    button.style.cssText = 'width:100%'

    cardTitle.innerText = title.toUpperCase();
    cardPrise.innerText = `$${prise}`;
    cardQuantity.innerText = `залишилось:${quantity} шт.`;
    descriptionBlock.innerText = description;
    button.innerText = 'Delete from LocalStorage';
    button.onclick = function() {
        removeItemFromLocal(id)
    }

    card.append(cardImage, cardTitle, descriptionBlock, cardPrise, cardQuantity, button);
    wrapper.appendChild(card);

};

document.body.append(wrapper)

if (arrayFromLocal) {
    document.body.append(removeButton)

    for (let item of arrayFromLocal) {
        createGoodsCard(item.url, item.title, item.prise, item.quantity, item.description, item.id)
    };
} else {
    wrapper.innerText = 'НЕ ДОДАНО ЖОДНОГО ТОВАРУ'
}