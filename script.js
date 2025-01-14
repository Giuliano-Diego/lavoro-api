function creaCard(linea, orario) {
    let riga = document.getElementById("riga");
    let divCol = document.createElement("div");
    divCol.classList.add("col-12", "col-md-4");
    let divCard = document.createElement("div");
    divCard.classList.add("card", "shadow-sm"); 
    divCard.style.width = "80%"; 
    divCard.style.height = "200px";  
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let divLinea = document.createElement("div");
    divLinea.classList.add("mb-2", "p-2", "text-white");

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
    divLinea.style.backgroundColor = ColLinea(linea);
    divLinea.textContent = `Linea: ${linea}`;
    let BusOrario = document.createElement("p");
    BusOrario.classList.add("card-text");
    BusOrario.textContent = `Orario: ${orario}`;
    divCardBody.appendChild(divLinea);
    divCardBody.appendChild(BusOrario);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    riga.appendChild(divCol);
}

function cerca() {
    let riga = document.getElementById("riga");
    riga.innerHTML = "";
    let numeroFermata = document.getElementById("input").value.trim();
    if (!numeroFermata) {
        alert(".");
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
            data.forEach(item => {
                if (item.line && item.hour) {
                    creaCard(item.line, item.hour);
                }
            });
        })
        .catch(error => {
            alert("Errore durante la ricerca dei dati.");
        });
}
