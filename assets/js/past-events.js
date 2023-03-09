
const cardContainer = document.getElementById('card-container');

const filterEvent = (arrayData) => {
    let cardPast = arrayData.filter(event => event.date < currentDate);
    return cardPast;
}

const createCards = (arrayData) => {
    let cards = '';

    arrayData.forEach((event) => {
        cards += `
                 <div class="col">
                    <div class="card h-100 text-bg-secondary">
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

                                <a href="details.html" class="btn btn-primary">Details...</a>
                            </div>
                    </div>
                </div>`

    });

    cardContainer.innerHTML = cards
}

const datePa = filterEvent(events);
createCards(datePa);


// CATEGORY 
// Variables
const categorySearch = document.getElementById('category-search');
let ultimateArr = events;

// Funciones
const filterCategories = (arrayData) => {
  let categoriesUnique = [];

  arrayData.forEach(event => {
    if (!categoriesUnique.includes(event.category)) {
      categoriesUnique.push(event.category);
    }
  });

  return categoriesUnique.sort();
}

const createCategories = (arrayCat) => {
  let categories = '';

  arrayCat.forEach(cat => {
    categories += `
      <div class="btn" aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" checked="checked" name="category" value="${cat}" id="${cat}" onclick="arrCategorySelected()">
        <label class="btn btn-outline-primary" for="${cat}">
          <span>${cat}</span>
        </label>
      </div>`
  });

  categorySearch.innerHTML = categories;
}

const filterEventsByCategory = (arrayCategories, arrayEvents = events) => {
  let filteredEvents = [];

  arrayCategories.forEach(categor => {
    arrayEvents.forEach(event => {
      if (event.category == categor) {
        filteredEvents.push(event)
      }
    })
  });

  return filteredEvents;
}

const arrCategorySelected = (() => {
  inputSearch.value = '';
  let selection = [];

  arrCategories.forEach(category => {
    let selector = document.getElementById(category);

    if (selector.checked) {
      selection.push(category)
    }
  });

  if (selection.length != 0) {
    createCards(filterEventsByCategory(selection))
  } else {
    cardContainer.innerHTML = ''
  }

  let checkedForSearch = filterEventsByCategory(selection)
  ultimateArr = checkedForSearch.map(event => event);

 
});

// Código principal
const arrCategories = filterCategories(events);
createCategories(arrCategories);





// SEARCH


 const inputSearch = document.getElementById('search');


 inputSearch.addEventListener("keyup", () => {
     const filteredCards = events.filter((event) => event.name.toLowerCase().includes(inputSearch.value.trim().toLowerCase()));

     createCards(filteredCards);

    

 });