// Filter
const catalogFilter = document.querySelector(".catalog-filter-container"),
    catalogItems = document.querySelectorAll(".catalog-container .catalog-item");

function filterBtn(){
    this.flag = !this.flag;
    if (this.flag){
        this.style.border = "2px solid bisque";
        for (let i of catalogItems){
            if (i.classList[1] == this.className + "-item"){
                i.style.display = "flex";
            }
        }
    }
    else {
        this.style.border = "none";
        for (let i of catalogItems){
            if (i.classList[1] == this.className + "-item"){
                i.style.display = "none";
            }
        }
    }
}

for (let i of catalogFilter.childNodes){
    i.flag = true;
    i.addEventListener('click', filterBtn);
}

// Add btn
function addItem(){
    this.flag = !this.flag;
    let item = {
        name: this.parentNode.childNodes[3].textContent,
        cost: this.parentNode.childNodes[5].textContent,
        img: this.parentNode.childNodes[1].childNodes[1].src,
        num: 1
    }
    if (this.flag){
        addedItems.push(item);
        this.style.border = "2px solid bisque";
        this.textContent = "В корзине";
    }
    else {
        for (let i = 0; i < addedItems.length; i++){
            if (addedItems[i].name == item.name){
                addedItems.splice(i, 1);
                break;
            }
        }
        this.style.border = "none";
        this.textContent = "Добавить";
    }
}

let addedItems = [];
if (sessionStorage.getItem('added items')){
    addedItems = JSON.parse(sessionStorage.getItem('added items'));
}
else {
    addedItems = [];
}

for (let i of catalogItems){
    let item = {
        name: i.childNodes[3].textContent,
        cost: i.childNodes[4].textContent,
        img: i.childNodes[1].childNodes[1].src,
        num: 1
    }
    i.childNodes[7].flag = false;
    for (let j of addedItems){
        if (j.name == item.name){
            i.childNodes[7].style.border = "2px solid bisque";
            i.childNodes[7].textContent = "В корзине";
            i.childNodes[7].flag = true;
            break;
        }
    }
    i.childNodes[7].addEventListener('click', addItem);
}

window.addEventListener("unload", () => {
    sessionStorage.setItem('added items', JSON.stringify(addedItems));
});