const botonAgregar = document.getElementById("boton-agregar-01");
const inputTarea = document.getElementById("input-nombre-tarea");
const inputFecha = document.getElementById("input-fecha-tarea");
const listaTareas = document.getElementById("tareas-por-hacer");

document.addEventListener("DOMContentLoaded", cargarTareas);

botonAgregar.addEventListener("click", () => {
  const nombreTarea = inputTarea.value.trim();
  const fechaTarea = inputFecha.value;

  if (nombreTarea === "" || fechaTarea === "") {
    alert("Por favor, ingresa un nombre de tarea y una fecha.");
    return;
  }

  const nuevaTarea = {
    nombre: nombreTarea,
    fecha: fechaTarea,
    completada: false,
  };

  agregarTarea(nuevaTarea);
  guardarTareas();

  inputTarea.value = "";
  inputFecha.value = "";
});

function agregarTarea(tarea) {

  const tareaItem = document.createElement("li");
  tareaItem.classList.add("tarea-item");

  if (tarea.completada) {
    tareaItem.classList.add("completada");
  }

  tareaItem.innerHTML = `
    <span class="nombre-tarea">${tarea.nombre}</span>
    <span class="fecha-tarea"> - Fecha: ${new Date(tarea.fecha).toLocaleString()}</span>
    <button class="boton-completar">Completar</button>
    <button class="boton-eliminar">Eliminar</button>
  `;

  // Evento para completar la tarea
  tareaItem.querySelector(".boton-completar").addEventListener("click", () => {
    tarea.completada = !tarea.completada;
    tareaItem.classList.toggle("completada");
    guardarTareas();
  });

  tareaItem.querySelector(".boton-eliminar").addEventListener("click", () => {
    tareaItem.remove();
    eliminarTarea(tarea);
  });

  listaTareas.appendChild(tareaItem);
}

function guardarTareas() {
  const tareas = [];
  listaTareas.querySelectorAll(".tarea-item").forEach((item) => {
    const nombre = item.querySelector(".nombre-tarea").textContent;
    const fecha = item.querySelector(".fecha-tarea").textContent.replace(" - Fecha: ", "");
    const completada = item.classList.contains("completada");
    tareas.push({ nombre, fecha, completada });
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasGuardadas.forEach((tarea) => agregarTarea(tarea));
}

function eliminarTarea(tareaAEliminar) {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  const tareasActualizadas = tareas.filter(
    (t) => t.nombre !== tareaAEliminar.nombre || t.fecha !== tareaAEliminar.fecha
  );
  localStorage.setItem("tareas", JSON.stringify(tareasActualizadas));
}
