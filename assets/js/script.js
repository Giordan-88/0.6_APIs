function infoSearch() {
  fetch("https://mindicador.cl/api/")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((data) => {
      let valor = document.getElementById("valores").value;
      let selectMoneda = document.getElementById("moneda");
      let convMoneda = document.getElementById("conversion");

      if (valor) {
        let moneda =
          selectMoneda.options[
            selectMoneda.options.selectedIndex
          ].innerHTML.toLowerCase();
        let valorMoneda = data[moneda].valor;
        let resultado = valor / valorMoneda;
        //getMonedas(data[moneda].codigo);
        convMoneda.innerHTML = ` 
          ${resultado.toFixed(2)} ${
          moneda[0].toUpperCase() + moneda.substring(1)
        }`;
        renderGrafica();
        return;
      } else {
        alert("Ingrese un valor");
        return;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getMonedas(moneda) {
  try {
    const endpoint = "https://mindicador.cl/api/" + moneda;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data.serie.slice(0, 10);
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    return [];
  }
}

function confiGrafica(monedas) {
  const tipoDeGrafica = "line";
  const nombresDeLasFechas = monedas.map((moneda) =>
    new Date(moneda.fecha).toLocaleDateString()
  );
  const titulo = "Valor del, + (Últimos 10 días)";
  const colorDeLinea = "blue";
  const valores = monedas.map((moneda) => moneda.valor);

  return {
    type: tipoDeGrafica,
    data: {
      labels: nombresDeLasFechas,
      datasets: [
        {
          label: titulo,
          borderColor: colorDeLinea,
          data: valores,
        },
      ],
    },
  };
}
let miGrafica = null;
async function renderGrafica() {
  let selectMoneda = document.getElementById("moneda");
  let codigoMoneda = selectMoneda.value;
  const monedas = await getMonedas(codigoMoneda);
  if (monedas.length === 0) {
    console.error("No hay datos para mostrar.");
    return;
  }
  const config = confiGrafica(monedas);
  const chartDOM = document.getElementById("myChart").getContext("2d");
  if (miGrafica) {
    miGrafica.destroy();
  }

  miGrafica = new Chart(chartDOM, config);
}
