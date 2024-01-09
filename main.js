whichPage();
$(".toDeleteFavorite").fadeOut(0);

const root = document.querySelector("#root");
const loader = document.querySelector(".loader");
const divDeleteFavorite = document.querySelector(".toDeleteFavorite");
const bClose = document.querySelector("#close");

let arrElementHtml = [];
let element;
let b;
let arrFavorites = [];

if (JSON.parse(localStorage.getItem("favorites"))) {
    arrFavorites = JSON.parse(localStorage.getItem("favorites"));
}

if (!(JSON.parse(localStorage.getItem("Data")))) {
    loadingData();
}
console.log(JSON.parse(localStorage.getItem("Data")));

HtmlForHomePage();
function HtmlForHomePage() {
    let Data = JSON.parse(localStorage.getItem("Data"));
    arrElementHtml = Data.map((item, key) => {

        let html = document.createElement('div');
        html.appendChild(document.createElement('div'));
        html.classList.add('coins');

        element = document.createElement('h3');
        element.innerHTML = item.name;
        html.firstChild.appendChild(element);

        element = document.createElement('h6');
        element.innerHTML = item.email;
        html.firstChild.appendChild(element);

        element = document.createElement('button');
        element.innerHTML = 'more info';
        element.addEventListener('click', function () {
            event.preventDefault();
            $(this).next().fadeToggle(1000);
        });
        html.firstChild.appendChild(element);

        element = document.createElement('div');
        element.innerHTML = `city: ${item.address.city}, street: ${item.address.street}, zipcode: ${item.address.zipcode}`;
        element.classList.add('description');
        html.firstChild.appendChild(element);

        element = document.createElement('label');
        element.classList.add('switch');


        let inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.addEventListener('change', function () {
            // console.log(inp.checked);
            event.preventDefault();
            if (inp.checked) {
                favoriteItems(item?.id, inp)
            } else {
                deleteItem(item?.id)
                console.log("bhb");
            }

        });
        element.appendChild(inp);

        let span = document.createElement('span');
        span.classList.add('slider');
        span.classList.add('round');

        element.appendChild(span);

        html.appendChild(element);

        return html;

    })
    console.log(arrElementHtml);

}





//get data once the time when page loading
async function loadingData() {

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    let Data = await response.json();
    console.log(Data);
    localStorage.setItem("Data", JSON.stringify(Data));
    console.log("im loading data");
    console.log(arrElementHtml);

}

//switch case to link to page
function whichPage(element) {
    event && event.preventDefault();
    switch (element?.dataset?.target) {
        case "#Home":
            root.innerHTML = '';
            root.appendChild(loader);
            setTimeout(() => {
                home();
            }, 200)
            break;
        case "#Data":
            root.innerHTML = '';
            root.appendChild(loader);
            if (arrFavorites.length > 0) {
                setTimeout(() => {
                    root.removeChild(loader);
                    let arr = favoritePage();
                    for (let index = 0; index < arr.length; index++) {
                        root.appendChild(arr[index]);
                    }
                }, 200)
            } else {
                root.innerHTML = 'don`t have favorite';
            }
            break;
        case "#About":
            root.innerHTML = about();
            break;

        default:
            setTimeout(() => {
                home();
            }, 2000)
            break;
    }
}

function home() {
    if (arrElementHtml.length > 0) {
        root.removeChild(loader);
        arrElementHtml.forEach((item, index) => {
            item.children[1].children[0].checked = false;
            if (arrFavorites.length > 0) {
                for (let i = 0; i < arrFavorites.length; i++) {
                    if (arrFavorites[i].name === item.children[0].children[0].innerHTML) {
                        item.children[1].children[0].checked = true;
                    }
                }
                // item.children[1].children[0].checked = false;
                root.appendChild(item);
            }
            root.appendChild(item);
        })
    } else if (Data) {
        arrElementHtml.forEach((item, index) => {
            root.appendChild(item);
        })
    } else {
        console.error("the data is empty");
    }
}


function favoriteItems(idForItem, inp) {

    if (arrFavorites.length < 5) {
        let Data = JSON.parse(localStorage.getItem("Data"));
        Data.forEach((item, index) => {
            if (item.id === idForItem) {
                arrFavorites.push(item)
            }
        })
        localStorage.removeItem("favorites")
        localStorage.setItem("favorites", JSON.stringify(arrFavorites));
    } else if (arrFavorites.length === 5) {
        inp.checked = false;
        alert("have too many favorites you can only 5")
        divDeleteFavorite.innerHTML = '';
        let arr = favoritePage();

        for (let index = 0; index < arr.length; index++) {
            divDeleteFavorite.appendChild(arr[index]);
            console.log("vgvg");
        }

        console.log($(".toDeleteFavorite"));
        divDeleteFavorite.appendChild(bClose)
        $(".toDeleteFavorite").fadeIn();
    }
    console.log(arrFavorites, idForItem);
}


function about() {
    return `about`

}


function deleteItem(idForItem) {
    let i; // give a random value to check if its changed
    arrFavorites.forEach((item, index) => {
        if (item.id === idForItem) {
            i = index;
        }
    })
    arrFavorites.splice(i, 1);
    console.log(arrFavorites);
    localStorage.removeItem("favorites")
    localStorage.setItem("favorites", JSON.stringify(arrFavorites));
}

function changeValue() {
    const value = + document.querySelector('#inp').value;
    if (value > 0 && value <= 10) {
        let Data = JSON.parse(localStorage.getItem('Data'));
        let arr = Data.filter((el) => {

            if (el?.id === value) {
                return true;
            }
        });

        arr = arr.map((item, key) => {

            let html = document.createElement('div');
            html.appendChild(document.createElement('div'));
            html.classList.add('coins');

            element = document.createElement('h3');
            element.innerHTML = item.name;
            html.firstChild.appendChild(element);

            element = document.createElement('h6');
            element.innerHTML = item.email;
            html.firstChild.appendChild(element);

            element = document.createElement('button');
            element.innerHTML = 'more info';
            element.addEventListener('click', function () {
                event.preventDefault();
                $(this).next().fadeToggle(1000);
            });
            html.firstChild.appendChild(element);

            element = document.createElement('div');
            element.innerHTML = `city: ${item.address.city}, street: ${item.address.street}, zipcode: ${item.address.zipcode}`;
            element.classList.add('description');
            html.firstChild.appendChild(element);

            element = document.createElement('label');
            element.classList.add('switch');


            let inp = document.createElement('input');
            inp.type = 'checkbox';
            inp.addEventListener('change', function () {
                // console.log(inp.checked);
                event.preventDefault();
                if (inp.checked) {
                    favoriteItems(item?.id, inp)
                } else {
                    deleteItem(item?.id)
                    console.log("bhb");
                }

            });
            element.appendChild(inp);

            let span = document.createElement('span');
            span.classList.add('slider');
            span.classList.add('round');

            element.appendChild(span);

            html.appendChild(element);

            return html;

        });
        root.innerHTML = '';
        console.log(arr);
        root.appendChild(arr[0]);

    } else {
        root.innerHTML = "only 1 up to 10";
    }


}


function favoritePage() {

    let arr = arrFavorites.map((item) => {
        let html = document.createElement('div');
        html.appendChild(document.createElement('div'));
        html.classList.add('forPageFavorites');

        element = document.createElement('h3');
        element.innerHTML = item.name;
        html.firstChild.appendChild(element);

        element = document.createElement('h6');
        element.innerHTML = item.email;
        html.firstChild.appendChild(element);

        element = document.createElement('button');
        element.innerHTML = 'more info';
        element.addEventListener('click', function () {
            event.preventDefault();
            $(this).next().fadeToggle(1000);
        });
        html.firstChild.appendChild(element);

        element = document.createElement('div');
        element.innerHTML = `city: ${item.address.city}, street: ${item.address.street}, zipcode: ${item.address.zipcode}`;
        element.classList.add('description');
        html.firstChild.appendChild(element);

        element = document.createElement('label');
        element.classList.add('switch');


        let inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.checked = true;
        inp.addEventListener('change', function () {
            event.preventDefault();
            deleteItem(item?.id)
            console.log("bhb");
            console.log($(this).parent().parent().fadeOut(1000));
        });
        element.appendChild(inp);

        let span = document.createElement('span');
        span.classList.add('slider');
        span.classList.add('round');

        element.appendChild(span);

        html.appendChild(element);

        return html;
    })
    return arr;
}


$('#close').on('click', function () {
    event.preventDefault();
    $('#close').parent().fadeOut(500);
    root.innerHTML = '';
    root.appendChild(loader);
    setTimeout(() => {
        home();
    }, 500);
    // console.log("was h");
})
