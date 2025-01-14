function creaCard(linea, orario) {
    let riga = document.getElementById("riga");

 
    let divCol = document.createElement("div");
    divCol.classList.add("col-12", "col-md-4");

    let divCard = document.createElement("div");
    divCard.classList.add("card", "shadow-sm");

    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");

    let BusLinea = document.createElement("h5");
    BusLinea.classList.add("card-title", "text-primary");
    BusLinea.textContent = `Linea: ${linea}`;

    let BusOrario = document.createElement("p");
    BusOrario.classList.add("card-text");
    BusOrario.textContent = `Orario: ${orario}`;

    divCardBody.appendChild(BusLinea);
    divCardBody.appendChild(BusOrario);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    riga.appendChild(divCol);
}

function cerca() {

    let riga = document.getElementById("riga");
    riga.innerHTML = "";


    let numeroFermata = document.getElementById("input").value;

    if (!numeroFermata) {
        alert("Per favore, inserisci un numero di fermata valido.");
        return;
    }

    let URL = "https://gpa.madbob.org/query.php?stop=" + numeroFermata;

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nella risposta dal server.");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                alert("Fermata inesistente");
                return;
            }
            data.forEach(item => creaCard(item.line, item.hour));
        })
}
