// - Імітуємо наповнення інтернет магазину товарами :
// Створити форму з наступними полями :
// - назва товару
// - кількість товару
// - ціна товару
// - картинка товару (посилання з інтернету)
// Зберігати товари в масив в локалсорадж. При збережені товару з форми, action не повинно відбуватись (preventDefault)
// створити елемент <a href='list.html'> На сторінку товарів</a>, та list.html, при переході на який відобразити на сторінці всі товари.
// На сторінці  list.html побудувати кнопку яка видаляє всі товари з корзини та локалстораджа.
// До кожного товару додати кнопку, при кліку на яку з лс видаляється конкретний обраний  товар
let mainWrapper = document.createElement('div');
mainWrapper.style.cssText = 'display:flex; padding:20px; max-width:1100px; margin:0 auto;';
let formWrapper = document.createElement('div');
formWrapper.style.cssText = 'display:flex; padding:10px;width:30%;';
let previewWrapper = document.createElement('div');
previewWrapper.style.cssText = 'display:flex; padding:10px;width:70%;height:400px; border:10px solid gray;align-items:center;';
let form = document.createElement('form');
form.action = '#';
form.name = 'createGoods';
form.method = 'post';
form.style.cssText = 'display:flex; flex-direction:column;gap:15px;'
let nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.name = 'name';
nameInput.placeholder = 'Name of goods';
let numberInput = document.createElement('input');
numberInput.type = 'number';
numberInput.name = 'number';
numberInput.placeholder = 'Quantity of goods'
let priseInput = document.createElement('input');
priseInput.type = 'number';
priseInput.name = 'prise';
priseInput.placeholder = 'Prise of goods'
let imageInput = document.createElement('input');
imageInput.type = 'text';
imageInput.name = 'image';
imageInput.placeholder = 'Link to the picture'
let formButton = document.createElement('button');
let descriptionInput = document.createElement('textarea');
descriptionInput.name = 'description';
descriptionInput.placeholder = 'Describe the product'
formButton.type = 'submit';
formButton.innerText = 'Save';
let previewButton = document.createElement('button');
previewButton.innerText = 'Preview';
let linkWrapper = document.createElement('p');
linkWrapper.style.cssText = 'text-align:center'
let linkPageWithOurProducts = document.createElement('a');
linkPageWithOurProducts.href = 'list.html';
linkPageWithOurProducts.innerText = 'Додані товари';
let productsCounter = document.createElement('span');
productsCounter.style.margin = '15px';

let infoForCounter = JSON.parse(localStorage.getItem('arrayWithProducts'))

productsCounter.innerText = infoForCounter ? infoForCounter.length : 0;

linkWrapper.append(linkPageWithOurProducts, productsCounter)
form.append(nameInput, numberInput, priseInput, imageInput, descriptionInput, previewButton, formButton);
formWrapper.appendChild(form);
mainWrapper.append(formWrapper, previewWrapper);
document.body.append(mainWrapper, linkWrapper);


let createGoodsCard = (url, title, prise, quantity, description, wrapper) => {
    let card = document.createElement('div');
    card.style.cssText = 'border:1px solid black; margin:0 auto; width:200px; height:350px;padding:15px;border-radius:5px;'
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
    button.innerText = 'Some action';


    card.append(cardImage, cardTitle, descriptionBlock, cardPrise, cardQuantity, button);
    wrapper.appendChild(card);

};

previewButton.onclick = function(e) {
    e.preventDefault();
    previewWrapper.innerText = '';

    let title = nameInput.value;
    let prise = priseInput.value;
    let quantity = numberInput.value;
    let url = imageInput.value;
    let description = descriptionInput.value;

    createGoodsCard(url, title, prise, quantity, description, previewWrapper)
};

formButton.onclick = function(e) {
    e.preventDefault();
    let title = nameInput.value;
    let prise = priseInput.value;
    let quantity = numberInput.value;
    let url = imageInput.value;
    let description = descriptionInput.value;
    let id = Date.now();

    let product = { title, prise, quantity, url, description, id };

    let arrayFromLocal = JSON.parse(localStorage.getItem('arrayWithProducts'));

    if (arrayFromLocal) {
        arrayFromLocal.push(product);
        localStorage.setItem('arrayWithProducts', JSON.stringify(arrayFromLocal));
        productsCounter.innerText = arrayFromLocal.length
    } else {
        let arrayWithProducts = [];
        arrayWithProducts.push(product);
        localStorage.setItem('arrayWithProducts', JSON.stringify(arrayWithProducts));
        productsCounter.innerText = 1;
    };
};