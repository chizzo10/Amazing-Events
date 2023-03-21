
const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

let allEvents;

let currentDate;

async function traerDatos() {

    try {
        const datos = await fetch(urlApi)
            .then(response => response.json())
            .then(data => data);

        allEvents = datos.events;
        currentDate = datos.currentDate;
        upcomingEventsInitializer();

    } catch (error) {
        console.log(error);
    }
}

traerDatos();

function upcomingEventsInitializer() {

    let cards = document.getElementById("cards");

    let bSearch = document.getElementById("search");

    let categoriesCheckBox = document.getElementById("checkbox");

    categoriesCheckBox.innerHTML = createCategoriesCheckBox(checkbox(allEvents));

    let checkboxs = document.querySelectorAll(".form-check-input");

    let notFound = `<div class="d-flex w-100 align-items-center justify-content-center flex-column">
<div class="col-6"> <span class="inline-flex fs-2 fw-bold">Oops... </span></div>
</div>`;


    categoriesCheckBox.addEventListener("click", function () {
        const wordSearch = document.getElementById("search-content");
        const arrayCategories = checkedCategoriesList(checkboxs);

        cards.innerHTML = createCards(filterCardsByCategoriesAndName(arrayCategories, wordSearch.value));
    })

    function createCategoriesCheckBox(categories) {
        let checkboxsHtml = "";
        let num = 1;
        for (const category of categories) {
            checkboxsHtml += `<div>
                            <input class="form-check-input" type="checkbox" name="category${num}" id="category${num}" value="${category}">
                            <label for="category${num}">${category}</label>
                        </div>`
            num++;
        }

        return checkboxsHtml;
    }

    function checkbox(events) {
        let categories = [];
        for (const item of events) {
            if (!categories.some((category) => category == item.category)) {
                categories.push(item.category);
            }
        }
        return categories;
    }

    bSearch.addEventListener("click", () => {
        const wordSearch = document.getElementById("search-content");
        const arrayCategories = checkedCategoriesList(checkboxs);

        cards.innerHTML = createCards(filterCardsByCategoriesAndName(arrayCategories, wordSearch.value));
    })

    function checkedCategoriesList(checkboxs) {
        let categories = [];
        checkboxs.forEach(item => {
            if (item.checked) {
                categories.push(item.value);
            }
        })
        return categories;
    }

    function filterCardsByCategoriesAndName(arrayCategories, wordSearch) {
        let cardsFiltered = (arrayCategories.length > 0) ? allEvents.filter(event => arrayCategories.includes(event.category)) : allEvents;
        cardsFiltered = (wordSearch.value != "") ? cardsFiltered.filter(event => event.name.toLowerCase().indexOf(wordSearch.trim().toLowerCase()) != -1) : cardsFiltered;
        return cardsFiltered;
    }
    //Funcion que renderiza en tarjetas cada dato enviado
    function createCards(data) {
        let allCards = "";
        let modo = (localStorage.getItem("dark-mode") == "true") ? "cardDM" : "";
        for (const event of data) {
            if (currentDate < event.date) {
                allCards += ` <div class="col">
                <div class="card h-100 ">
                  <img src="${event.image}" class="card-img-top" alt="${event.name}">
                    <div class="card-body">
                      <h5 class="card-title">${event.name}</h5>
                      <p class="card-text">${event.description}</p>
                    </div>
                    <div class="card-footer pt-3 pb-3 d-flex justify-content-around align-items-center align-items-xl-baseline">
                      <p class="mb-0 d-flex flex-row flex-md-column flex-xl-row">
                        <span>
                          <i class="bi bi-tag"></i>
                          Price:&nbsp;
                        </span>
                        $${event.price}
                      </p>
        
                      <a href="./details.html?id=${event._id}" class="btn btn-primary">Details...</a>
                    </div>
                </div>
              </div>`;
            }
        }
        return allCards == "" ? (notFound) : allCards;

    }
    //Muestra todas las tarjetas al cargar la pagina
    cards.innerHTML = createCards(allEvents);

    
}

