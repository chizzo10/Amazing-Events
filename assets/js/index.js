
// function darkMode() {
//     const body = document.body
//     body.classList.toggle("darkMode")
// }

// body.classList.toggle("darkMode")
const cardContainer = document.getElementById('container-cards');

function createCards(arrayData) {
    let card = '';
    let cards = '';
    for (const event of arrayData) {
        if (parseInt(event.date) >= parseInt(currentDate)) {
            card +=`
            
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
                    
                    <a href="details.html" class="btn btn-primary">Details...</a>
                </div>
            </div>
                </div>`

        }
        else {
            cards += `
            
                
                <div class="col">
                    <div class="card h-100 text-bg-secondary border-dange">
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
        }
    }

    return (card + cards)
}

let elementsCards = createCards(events)

cardContainer.innerHTML = elementsCards