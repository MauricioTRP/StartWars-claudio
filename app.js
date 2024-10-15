async function obtenerPersonaje(id) {
  const respuesta = await fetch(`https://swapi.dev/api/people/${id}/`);
  const data = await respuesta.json();
  return data;
}


async function* generarPersonajes(ids) {
  for (let id of ids) {
    const personaje = await obtenerPersonaje(id);

    yield mostrarPersonaje(personaje);
  }
}

/**
 * pesonaje: Object
 * return: void
 */
function mostrarPersonaje(personaje) {
  const contenedor = document.getElementById('contenedor');
  const bloque = document.createElement('div');
  bloque.innerHTML = `
    <h3>${personaje.name}</h3>
    <p>Estatura: ${personaje.height} cm</p>
    <p>Peso: ${personaje.mass} kg</p>
  `;
  contenedor.appendChild(bloque);
}


const generador = generarPersonajes([1, 2, 3, 4, 5]);
document.getElementById('rango1').addEventListener('mouseenter', () => {
  for (let i = 1; i <= 5; i++) {

    generador.next().value.then(personaje => generador.next(personaje));
  }
});

