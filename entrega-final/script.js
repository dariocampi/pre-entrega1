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

    let catalogo = "Catálogo de autos:\n\n";

    // Uso de Map -> Mostrar modelos en mayúsculas
    const autosModeloEnMayuscula = autos.map((auto) => {
      auto.modelo = auto.modelo.toUpperCase();
      return auto;
    });

    for (
      let index = 0;
      index < autosModeloEnMayuscula.length;
      index++
    ) {
      const auto = autos[index];
      catalogo =
        catalogo +
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
        "\n";
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(catalogo);
  } catch (error) {
    alert("Error al cargar el catálogo de autos");
  }
}



function comprarAuto() {
  const seleccion = parseInt(prompt('Ingrese el número del auto que desea comprar:')) - 1;

  if (seleccion >= 0 && seleccion < autos.length) {
    const autoSeleccionado = autos[seleccion];

    const nombre = prompt('Ingrese su nombre completo:');
    const direccion = prompt('Ingrese su dirección de entrega:');
    const tarjetaCredito = prompt('Ingrese el número de su tarjeta de crédito:');

    const confirmacion = 'Compra realizada exitosamente.\n\nAuto: ' + autoSeleccionado.modelo + ' - ' + autoSeleccionado.marca + '\nNombre: ' + nombre + '\nDirección: ' + direccion + '\nTarjeta de crédito: ' + tarjetaCredito;

    alert(confirmacion);
  } else {
    alert('Selección inválida');
  }
}


async function simuladorCompraAuto() {
  let opcion = "";

  do {
    opcion = prompt(
      "Seleccione una opción:\n\n1. Ver catálogo de autos\n2. Comprar auto\n3. Salir"
    );

    switch (opcion) {
      case "1":
        await mostrarCatalogo();
        break;
      case "2":
        comprarAuto();
        break;
      case "3":
        alert("Gracias por utilizar nuestra página oficial");
        break;
      default:
        alert("Opción inválida");
        break;
    }
  } while (opcion !== "3");
}


// obtener elemento del DOM y capturar su evento click
var btnIniciarSimulador = document.getElementById("btnIniciarSimulador");
btnIniciarSimulador.addEventListener("click", () => {
  simuladorCompraAuto().then(() => console.log("Simulador finalizado"));
});
