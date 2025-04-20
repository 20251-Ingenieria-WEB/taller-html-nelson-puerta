function buscarPersonajes(){
    const nombre = document.getElementById("searchInput").value.trim(); // Obtener el valor del input y eliminar espacios en blanco
    const contenedor = document.getElementById("resultados"); // Obtener el contenedor de resultados
    contenedor.innerHTML = ""; // Limpiar resultados anteriores

    if (nombre === "") {
        contenedor.innerHTML = "<p>Por favor, ingresa un nombre.</p>"; // Mensaje si el input está vacío
        return;
    }

    fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nombre)}`) // Hacer la petición a la API de Rick y Morty
        .then((res) => {
            if (!res.ok) {  // Verificar si la respuesta es correcta
                throw new Error("No se encotraron los personajes."); // Manejar errores de la respuesta
            }
            return res.json(); // Convertir la respuesta a JSON
        })
        .then((data) => { // Utilizar los datos obtenidos
            const personajes = data.results.slice(0, 10); // Mostrar solo los primeros 10 resultados
            
            personajes.forEach((personaje) => { // Iterar sobre los personajes
                // Crear un elemento HTML para cada personaje
                const card = document.createElement("div");
                card.classList.add("card"); // Añadir clase para estilos
                // Insertar contenido en el elemento card
                card.innerHTML = ` 
                    <img src="${personaje.image}" alt="${personaje.name}">
                    <h2>${personaje.name}</h2>
                    <p>Especie: ${personaje.species}</p>
                    <p>Estado: ${personaje.status}</p>
                `;
                contenedor.appendChild(card);   // Añadir el card al contenedor de resultados
            });
        })
        .catch((error) => {
            console.error("Error:", error); // Manejar errores de la petición
            contenedor.innerHTML = "<p>No se encontraron personajes.</p>";
        });
}