


const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get('id');

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
        detailsInitializer()

    } catch (error) {
        console.log(error);
    }
}

traerDatos();

function detailsInitializer() {

    const eventDetail = allEvents.find(event => event._id == id);
    createCard()
    function createCard() {
        const detailCard = document.getElementById('detailCard');
        card =`

        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img id="detail-img" src="${eventDetail.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${eventDetail.name}</h5>
              <p class="card-text">${eventDetail.description}</p>
              <div class="card-footer p-3">
              <p class="card-text"><small class="text-muted"><span class="col-7">Category: ${eventDetail.category}</span></small></p>
              <p class="card-text"><small class="text-muted"><span class="col-7">Capacity: ${eventDetail.capacity}</span></small></p>
              <p class="card-text"><small class="text-muted"> <span class="col-7">Date: ${eventDetail.date}</span></small></p>
              <p class="card-text"><small class="text-muted"> <span class="col-7">Place: ${eventDetail.place}</span></small></p>
              <p class="card-text"><small class="text-muted"><span class="col-7">Price:$ ${eventDetail.price}</span></span></small></p>
              <p class="card-text"><small class="text-muted"><span class="col-7"> ${(eventDetail.assistance != undefined) ? ("Assistance: ") : ("Estimate: ")}  ${(eventDetail.assistance != undefined) ? (eventDetail.assistance) : (eventDetail.estimate)}</span></small></p>
              </div>
              
            </div>
          </div>
        </div>
      </div>`



        detailCard.innerHTML = card;
    }



}