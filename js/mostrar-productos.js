import { main } from "./main.js";

const lista = document.querySelector("[data-lista]");

export default function crearCard(nombre, precio, imagen, id) {
  const producto = document.createElement("li");
  producto.className = "container-producto  ";
  producto.innerHTML = `
  <div class="descripcion-producto ">
        <img class="imagen-producto" src="${imagen}" />
        <h5 class="nombre-producto">${nombre}</h5>
        <p class="precio-producto"> $${precio}</p>
        <button class="icono-borrar" data-id="${id}">
          <div class="icono-basurero">
            <img class="trash-icon" src="./img/trash-icon.svg">
          </div>
        </button>

    </div> `;

  const eliminarBoton = producto.querySelector(".icono-borrar");
  eliminarBoton.addEventListener("click", () => {
    main
      .eliminarProducto(id)
      .then(() => {
        producto.remove();
      })
      .catch((error) => console.log(error));
  });

  try {
    lista.appendChild(producto);
  } catch (error) {
    console.error("Error al agregar el producto a la lista:", error);
  }

  return producto;
}

async function listarProductos() {
  try {
    const listaAPI = await main.listarProductos();

    listaAPI.forEach((producto) =>
      lista.appendChild(
        crearCard(
          producto.nombre,
          producto.precio,
          producto.imagen,
          producto.id
        )
      )
    );
  } catch (error) {
    console.log(error);
  }
}

listarProductos();
