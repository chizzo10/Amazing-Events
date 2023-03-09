
 // Obtener el ID del evento de la consulta de la URL
const params = new URLSearchParams(location.search);
const id = params.get("id");

// Encontrar el evento correspondiente al ID
const detailEvent = events.find((event) => event.id == id);

// Formatear la fecha del evento para mostrarla en un formato legible
const detailDate = new Date(detailEvent.date + "T00:00:00.000-05:00");
const detailDateFormatted = detailDate.toDateString();

// Definir las variables que se utilizarán para mostrar los detalles del evento
const place = detailEvent.place;
const price = detailEvent.price;
const capacity = detailEvent.capacity;
const assistance = detailEvent.assistance;
const estimate = detailEvent.estimate;

// Determinar si el evento se realizará en el futuro o no
const date = new Date();
const currentDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
const eventDate = detailEvent.date;
const isFutureEvent = eventDate >= currentDate;

// Crear el HTML para mostrar los detalles del evento
const cardColor = isFutureEvent ? "" : "bg-secondary";
const cardTitle = detailEvent.name;
const cardDescription = detailEvent.description;
const cardCategory = detailEvent.category;
const cardDate = detailDateFormatted;
const cardPlace = place;
const cardPrice = `$${price}`;
const cardCapacity = capacity;
const cardAssistance = assistance || estimate;

const cardBodyHtml = `
  <h5 class="card-title">${cardTitle}</h5>
  <p class="card-text">${cardDescription}</p>
  <p class="card-text"><small class="text-muted"><span>Category:&nbsp;</span>${cardCategory}</small></p>
  <p class="card-text"><small class="text-muted"><span>Date:&nbsp;</span><time datetime="${eventDate}">${cardDate}</time></small></p>
  <p class="card-text"><small class="text-muted"><span>Place:&nbsp;</span>${cardPlace}</small></p>
  <p class="card-text"><small class="text-muted"><span>Price:&nbsp;</span>${cardPrice}</small></p>
  <p class="card-text"><small class="text-muted"><span>Capacity:&nbsp;</span>${cardCapacity}</small></p>
  <p class="card-text"><small class="text-muted"><span>Assistance:&nbsp;</span>${cardAssistance}</p>
`;

const cardHtml = `
  <div class="card mb-3 text-${cardColor}" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${detailEvent.image}" class="img-fluid rounded-start" alt="Details image">
      </div>
      <div class="col-md-8`



//  const queryString = location.search;

//  const params = new URLSearchParams(queryString);

//  const id = params.get("id")

//  const detailEvent = events.find(event => event.id == id);

//  const detailsContainer = document.getElementById('details-container')

// const detailDateFormatted = new Date(detailEvent.date + "T00:00:00.000-05:00").toDateString();

//  if (detailEvent.date >= currentDate) {
//      detailsContainer.innerHTML = `
//    <div class="card mb-3 text-${date >= currentDate ? '' : 'bg-secondary'}" style="max-width: 540px;">
//      <div class="row g-0">
//       <div class="col-md-4">
//         <img src="${detailEvent.image}" class="img-fluid rounded-start" alt="Details image">
//        </div>
//       <div class="col-md-8">
//          <div class="card-body">
//            <h5 class="card-title">${detailEvent.name}</h5>
//           <p class="card-text">${detailEvent.description}}</p>
//           <p class="card-text"><small class="text-muted"><span>Category:&nbsp;</span>${detailEvent.category}</small></p>
//           <p class="card-text"><small class="text-muted"><span>Date:&nbsp;</span><time datetime="${detailEvent.date}">${detailDateFormatted}</time></small></p>
//            <p class="card-text"><small class="text-muted"> <span>Place:&nbsp;</span>${place}</small></p>
//            <p class="card-text"><small class="text-muted"><span>Price:&nbsp;</span>$${price}</small></p>
//           <p class="card-text"><small class="text-muted"><span>Capacity:&nbsp;</span>${capacity}</small></p>
//           <p class="card-text"><small class="text-muted"><span>Assistance:&nbsp;</span>${assistance || estimate}</p>
//          </div>
//        </div>
//      </div>
//    </div>`
//  } else {
//    detailsContainer.innerHTML = `
//    <div class="card mb-3 text-${date >= currentDate ? '' : 'bg-secondary'}" style="max-width: 540px;">
//    <div class="row g-0">
//      <div class="col-md-4">
//        <img src="${detailEvent.image}" class="img-fluid rounded-start" alt="Details image">
//      </div>
//      <div class="col-md-8">
//       <div class="card-body">
//          <h5 class="card-title">${detailEvent.name}</h5>
//          <p class="card-text">${detailEvent.description}}</p>
//         <p class="card-text"><small class="text-muted"><span>Category:&nbsp;</span>${detailEvent.category}</small></p>
//          <p class="card-text"><small class="text-muted"><span>Date:&nbsp;</span><time datetime="${detailEvent.date}">${detailDateFormatted}</time></small></p>
//         <p class="card-text"><small class="text-muted"> <span>Place:&nbsp;</span>${place}</small></p>
//          <p class="card-text"><small class="text-muted"><span>Price:&nbsp;</span>$${price}</small></p>
//         <p class="card-text"><small class="text-muted"><span>Capacity:&nbsp;</span>${capacity}</small></p>
//          <p class="card-text"><small class="text-muted"><span>Assistance:&nbsp;</span>${assistance || estimate}</p>
//        </div>
//      </div>
//    </div>
//  </div>`
//  }



