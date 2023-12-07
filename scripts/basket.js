// basket items
const basketItem = document.querySelector(".basket-item"),
    basketContainer = document.querySelector(".basket-container"),
    paymentPanel = document.querySelector('.payment-panel');

function plusBtn(){
    let num = Number(this.parentNode.childNodes[3].textContent);
    for (let i = 0; i < addedItems.length; i++){
        if (addedItems[i].name == this.parentNode.parentNode.childNodes[3].textContent){
            addedItems[i].num = num + 1;
            countItems(this.parentNode.parentNode.childNodes[3].textContent, addedItems[i].cost, num + 1);
            break;
        }
    }
    countSum();
    this.parentNode.childNodes[3].textContent = num + 1;
}

function minusBtn(){
    let num = Number(this.parentNode.childNodes[3].textContent);
    if (num == 1) {
        for (let i = 0; i < addedItems.length; i++){
            if (addedItems[i].name == this.parentNode.parentNode.childNodes[3].textContent){
                delSpanFromCheque(addedItems[i].name);
                addedItems.splice(i, 1);
                break;
            }
        }
        basketContainer.removeChild(this.parentNode.parentNode.parentNode);
    }
    for (let i = 0; i < addedItems.length; i++){
        if (addedItems[i].name == this.parentNode.parentNode.childNodes[3].textContent){
            addedItems[i].num = num - 1;
            countItems(this.parentNode.parentNode.childNodes[3].textContent, addedItems[i].cost, num - 1);
            break;
        }
    }
    countSum();
    this.parentNode.childNodes[3].textContent = num - 1;
}

function delBtn(){
    for (let i = 0; i < addedItems.length; i++){
        if (addedItems[i].name == this.parentNode.childNodes[3].textContent){
            delSpanFromCheque(addedItems[i].name);
            addedItems.splice(i, 1);
            break;
        }
    }
    countSum();
    basketContainer.removeChild(this.parentNode.parentNode);
}

function delSpanFromCheque(name){
    for (let i of paymentPanel.childNodes[1].childNodes){
        if (i.itemName == name){
            paymentPanel.childNodes[1].removeChild(i);
            break;
        }
    }
}

function countItems(name, cost, num) {
    for (let i of paymentPanel.childNodes[1].childNodes){
        if (i.itemName == name){
            i.textContent = i.textContent.slice(0, i.textContent.indexOf('x') + 1) + num + ' ' + Number(cost.slice(0, -4))*Number(num) + ' руб';
            break;
        }
    }
}

function countSum(){
    let sum = 0;
    for (let i of addedItems){
        sum += Number(i.cost.slice(0, -4))*Number(i.num);
    }

    paymentPanel.childNodes[3].childNodes[3].textContent = sum + ' руб';
}

// add items
let addedItems = [];

if (sessionStorage.getItem('added items')){
    addedItems = JSON.parse(sessionStorage.getItem('added items'));
}
else {
    addedItems = [];
}

countSum();

for (let i of addedItems){
    let newItem = basketItem.cloneNode(true);

    newItem.style.display = 'flex';
    newItem.childNodes[1].childNodes[1].src = i.img;
    newItem.childNodes[3].childNodes[3].textContent = i.name;
    newItem.childNodes[3].childNodes[5].textContent = i.cost;
    newItem.childNodes[3].childNodes[7].childNodes[3].textContent = i.num;

    newItem.childNodes[3].childNodes[7].childNodes[5].addEventListener('click', plusBtn);
    newItem.childNodes[3].childNodes[7].childNodes[1].addEventListener('click', minusBtn);
    newItem.childNodes[3].childNodes[1].addEventListener('click', delBtn);

    basketContainer.appendChild(newItem);

    let newChequeLine = document.createElement('span');
    newChequeLine.textContent = i.name + ' x' + i.num + ' ' + Number(i.cost.slice(0, -4))*Number(i.num) + ' руб';
    newChequeLine.itemName = i.name;
    paymentPanel.childNodes[1].appendChild(newChequeLine);
}

// pay btn
paymentPanel.childNodes[5].addEventListener('click', () => {
    addedItems = [];
    location.reload();
});

window.addEventListener("unload", () => {
    sessionStorage.setItem('added items', JSON.stringify(addedItems));
});