function creaCard(linea, orari) {
    let riga = document.getElementById("riga");
    let divCol = document.createElement("div");
    divCol.classList.add("col-12", "col-md-4");
    let divCard = document.createElement("div");
    divCard.classList.add("card", "shadow-sm");
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let divLinea = document.createElement("div");
    divLinea.classList.add("mb-2", "p-2", "text-white", "d-flex", "align-items-center", "justify-content-center");
    divLinea.style.backgroundColor = ColLinea(linea);
    divLinea.style.width = "50px";  
    divLinea.style.height = "50px"; 
    divLinea.style.borderRadius = "50%";
    divLinea.textContent = linea;
    divLinea.style.fontSize = "20px";  
    let divOrari = document.createElement("div");
    divOrari.classList.add("mt-3");
    orari.forEach(orario => {
        let pOrario = document.createElement("p");
        pOrario.classList.add("card-text");
        pOrario.textContent = `Orario: ${orario}`;
        divOrari.appendChild(pOrario);
    });
    divCardBody.appendChild(divLinea);
    divCardBody.appendChild(divOrari);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    riga.appendChild(divCol);
}

function cerca() {
    let riga = document.getElementById("riga");
    riga.innerHTML = "";
    let numeroFermata = document.getElementById("input").value.trim();
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
            if (!Array.isArray(data) || data.length === 0) {
                alert("Non ci sono pullman disponibili.");
                return;
            }

            let orariPerLinea = {};

            data.forEach(item => {
                if (item.line && item.hour) {
                    if (!orariPerLinea[item.line]) {
                        orariPerLinea[item.line] = [];
                    }
                    orariPerLinea[item.line].push(item.hour);
                }
            });
            for (let linea in orariPerLinea) {
                creaCard(linea, orariPerLinea[linea]);
            }
        })
        .catch(error => {
            alert("Errore");
        });
}

const ColLinea = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    const r = (hash >> 16) & 0xFF;
    const g = (hash >> 8) & 0xFF;
    const b = hash & 0xFF;
    return `#${((r + 128) % 256).toString(16).padStart(2, '0')}${((g + 128) % 256).toString(16).padStart(2, '0')}${((b + 128) % 256).toString(16).padStart(2, '0')}`;
};
