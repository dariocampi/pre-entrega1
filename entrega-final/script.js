let autos = [];

function fetchAutos() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "autos.json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          autos = JSON.parse(xhr.responseText);
          resolve(autos);
        } else {
          reject("Error al obtener los datos");
        }
      }
    };
    xhr.send();
  });
}

async function mostrarCatalogo() {
  try {
    const autos = await fetchAutos();

    let catalogo = "Catálogo de autos:<br><br>";

    // Uso de Map -> Mostrar modelos en mayúsculas
    const autosModeloEnMayuscula = autos.map((auto) => {
      auto.modelo = auto.modelo.toUpperCase();
      return auto;
    });

    for (let index = 0; index < autosModeloEnMayuscula.length; index++) {
      const auto = autos[index];
      catalogo +=
        (index + 1) +
        ". " +
        auto.modelo +
        " - " +
        auto.marca +
        " - " +
        auto.anio +
        " - " +
        auto.kilometraje +
        " km - " +
        auto.color +
        " - $" +
        auto.precio +
        "<br>";
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.getElementById("output").innerHTML = catalogo;
  } catch (error) {
    document.getElementById("output").innerHTML = "Error al cargar el catálogo de autos";
  }
}

function comprarAuto() {
  const seleccion = parseInt(document.getElementById("numeroAuto").value) - 1;

  if (seleccion >= 0 && seleccion < autos.length) {
    const autoSeleccionado = autos[seleccion];

    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let tarjetaCredito = document.getElementById("tarjetaCredito").value;

    if (nombre === "" || direccion === "" || tarjetaCredito === "") {
      document.getElementById("output").innerHTML = "Por favor, complete todos los campos.";
    } else {
      if (localStorage.getItem('nombre') === null){
        localStorage.setItem('nombre', nombre);
      }

      nombre = localStorage.getItem('nombre');

      const confirmacion = 'Compra realizada exitosamente.<br><br>Auto: ' + autoSeleccionado.modelo + ' - ' + autoSeleccionado.marca + '<br>Nombre: ' + nombre + '<br>Dirección: ' + direccion + '<br>Tarjeta de crédito: ' + tarjetaCredito;
      alertify.alert('Felicidades, ya es tuyo!').set({ title: 'Simulador de compra de un auto' });
      console.log(confirmacion);
      document.getElementById("output").innerHTML = confirmacion;
    }
  } else {
    document.getElementById("output").innerHTML = 'Selección inválida';
  }
}

async function simuladorCompraAuto() {
  const iniciarSimuladorBtn = document.getElementById("btnIniciarSimulador");
  iniciarSimuladorBtn.disabled = true;

  let opcion = "";

  do {
    document.getElementById("menuOpciones").style.display = "block";
    document.getElementById("btnMostrarCatalogo").addEventListener("click", async () => {
      document.getElementById("menuOpciones").style.display = "none";
      await mostrarCatalogo();
    });

    document.getElementById("btnComprarAuto").addEventListener("click", () => {
      document.getElementById("menuOpciones").style.display = "none";
      comprarAuto();
    });

    document.getElementById("btnSalir").addEventListener("click", () => {
      document.getElementById("menuOpciones").style.display = "none";
      document.getElementById("output").innerHTML = "Gracias por utilizar nuestra página oficial";
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (opcion !== "3");

  iniciarSimuladorBtn.disabled = false;
}

const btnIniciarSimulador = document.getElementById("btnIniciarSimulador");
btnIniciarSimulador.addEventListener("click", () => {
  simuladorCompraAuto().then(() => console.log("Simulador finalizado"));
});