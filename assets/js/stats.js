

let eventStatics = document.getElementById("eventStatics");
let upcomingStatics = document.getElementById("upcomingStatics");
let pastsStatics = document.getElementById("pastsStatics");

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
        statsInitializer();

    } catch (error) {
        console.log(error);
    }
}
traerDatos();
function statsInitializer() {


    let sortEventByPercentageOfAttendance = allEvents.filter(e => e.assistance != undefined).sort((a, b) =>  (b.assistance / b.capacity) - (a.assistance / a.capacity));
    let sortEventByPercentageOfEstimate = allEvents.filter(e => e.estimate != undefined).sort((a, b) => (a.estimate / a.capacity) - (b.estimate / b.capacity));
    let sortEventByCapacity = allEvents.filter(e => e.assistance != undefined).sort((a, b) =>  b.capacity - a.capacity);

    let pastArray = [];
    sortEventByPercentageOfAttendance.map(ev => {
        if (!pastArray.some((item) => ev.category == item.category)) {
            pastArray.push({
                category: ev.category,
                revenues: ev.price * ev.assistance,
                capacity: ev.capacity,
                assistance: ev.assistance
            });
        } else if (pastArray.some((item) => ev.category == item.category)) {
            pastArray.map(e => {
                if (e.category == ev.category) {
                    e.capacity += ev.capacity;
                    e.revenues += ev.price * ev.assistance;
                    e.assistance += ev.assistance;
                }
            })
        }
    });

    let upcomingArray=[];
    sortEventByPercentageOfEstimate.map(ev => {
        if (!upcomingArray.some((item) => ev.category == item.category)) {
            upcomingArray.push({
                category: ev.category,
                revenues: ev.price * ev.estimate,
                capacity: ev.capacity,
                estimate: ev.estimate
            });
        } else if (upcomingArray.some((item) => ev.category == item.category)) {
            upcomingArray.map(e => {
                if (e.category == ev.category) {
                    e.capacity += ev.capacity;
                    e.revenues += ev.price * ev.estimate;
                    e.estimate += ev.estimate;
                }
            })
        }
    });

    eventStatics.innerHTML = eventStaf(sortEventByPercentageOfAttendance,sortEventByCapacity);
    pastsStatics.innerHTML = pastStaf(pastArray);
    upcomingStatics.innerHTML = updateStaf(upcomingArray);

   function eventStaf(eventsAttendance, eventsCapacity) {
    let rows = '';

    // Encabezados de la tabla
    rows += `<tr>
                <td class="bg-primary">Eventos con el mayor porcentaje de asistencia</td>
                <td class="bg-primary">Eventos con el menor porcentaje de asistencia</td>
                <td class="bg-primary">Evento con la mayor capacidad</td>
             </tr>
            `;

    // Filas de la tabla
    for (let i = 0; i < 3; i++) {
        const highestAttendance = eventsAttendance[i];
        const lowestAttendance = eventsAttendance[eventsAttendance.length - i - 1];
        const largestCapacity = eventsCapacity[i];

        const highestAttendancePercentage = ((highestAttendance.assistance / highestAttendance.capacity) * 100).toFixed(2);
        const lowestAttendancePercentage = ((lowestAttendance.assistance / lowestAttendance.capacity) * 100).toFixed(2);

        rows += `<tr>
                    <td>${highestAttendance.name}: ${highestAttendancePercentage}%</td>
                    <td>${lowestAttendance.name}: ${lowestAttendancePercentage}%</td>
                    <td>${largestCapacity.name}: ${largestCapacity.capacity}</td>
                </tr>`;
    }

    return rows;
}

    function updateStaf(array){
        let rows = `<tr>
                        <td class="bg-primary">Categories</td>
                        <td class="bg-primary">Revenues</td>
                        <td class="bg-primary">Percentage of estimate</td>
                    </tr>`;

        for (const item of array) {
            rows += `<tr>
                        <td>${item.category}</td>
                        <td>$${item.revenues}</td>
                        <td>${((item.estimate)/(item.capacity)*100).toFixed(2)} %</td>
                    </tr>`
        }
        return rows;
    }

    function pastStaf(array){
        let rows = `<tr>
                        <td class="bg-primary">Categories</td>
                        <td class="bg-primary">Revenues</td>
                        <td class="bg-primary">Percentage of attendance</td>
                    </tr>`;

        for (const item of array) {
            rows += `<tr>
                        <td>${item.category}</td>
                        <td>$${item.revenues}</td>
                        <td>${((item.assistance)/(item.capacity)*100).toFixed(2)} %</td>
                    </tr>`
        }
        return rows;
    }
}


