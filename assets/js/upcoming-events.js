



            
const cardContainer = document.getElementById('card-container');


const filterE = (arrayData) => {
    let datePu = arrayData.filter(event => event.date >= currentDate);
    return datePu;
}

const createCards = (arrayData) => {
    let cards = '';

    arrayData.forEach((event) => {
            cards +=`
                <div class="col">
                    <div class="card h-100 text-bg-light">
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

                                <a href="./details.html?id=${event.id}" class="btn btn-primary">Details...</a>
                            </div>
                    </div>
                </div>`





});

cardContainer.innerHTML = cards
}

const listUP = filterE(events);
createCards(listUP)


// CATEGORY 
const categoryContainer = document.getElementById('category-search');

// Obtiene una lista de categorías únicas de una lista de eventos
const obtenerCategoriasUnicas = (eventos) => {
  const categorias = eventos.map(evento => evento.category);
  const categorysUp = [...new Set(categorias)];
  return categorysUp.sort();
};

// Crea el HTML para mostrar las categorías en la página
const crearCategorias = (categorias) => {
  const categoriasHTML = categorias.map(categoria => {
    return `
      <div class="btn" aria-label="Basic checkbox toggle button group">
        <input type="checkbox" class="btn-check" checked="checked" name="category" value="${categoria}" id="${categoria}" onclick="filtrarPorCategoria()">
        <label class="btn btn-outline-primary" for="${categoria}">
          <span>${categoria}</span>
        </label>
      </div>
    `;
  }).join('');

  categoryContainer.innerHTML = categoriasHTML;
};

// Filtra una lista de eventos por categoría
const filtrarEventosPorCategoria = (categoriasSeleccionadas, eventos = listUP) => {
  const eventosFiltrados = eventos.filter(evento => categoriasSeleccionadas.includes(evento.category));
  return eventosFiltrados;
};

// Función que se llama cuando se selecciona una categoría
const filtrarPorCategoria = (() => {
  inputSearch.value = '';

  const categoriasSeleccionadas = arrCategories.filter(categoria => {
    const selector = document.getElementById(categoria);
    return selector.checked;
  });

  const eventosFiltrados = categoriasSeleccionadas.length ? filtrarEventosPorCategoria(categoriasSeleccionadas) : [];

  createCards(eventosFiltrados);
  ultimateArr = [...eventosFiltrados];
});

const arrCategories = obtenerCategoriasUnicas(events);
crearCategorias(arrCategories);




// SEARCH


  const inputSearch = document.getElementById('search');


   inputSearch.addEventListener("keyup", () => {
     const filteredCards = events.filter((event) => event.name.toLowerCase().includes(inputSearch.value.trim().toLowerCase()));

     createCards(filteredCards);

    

  });


 
