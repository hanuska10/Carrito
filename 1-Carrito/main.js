const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];


cargarEventos()

function cargarEventos() {
    listaCursos.addEventListener('click', agregarCurso) //agregas cursos
    carrito.addEventListener('click', eliminarCurso); //elimina curso del carrito
    vaciarCarritoBtn.addEventListener('click', () => { //vacía el carrito
        articulosCarrito = []; //resetemaos el arreglo
        limpiarHTML();
    })
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) { //selecciono el curso
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}
//Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }

}

//leer los datos del curso
function leerDatosCurso(curso) {
    //crear objeto con el contenido del curso actual
    const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //actualizar cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso => curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })

    } else {
        //agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//muestra el carrito de compras con art.
function carritoHTML() {
    limpiarHTML();
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
                <td><img src="${imagen}" width=100> </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td> 
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
                </td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma clásica
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}