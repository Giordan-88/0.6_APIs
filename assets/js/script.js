/* async function infoSearch() {
  const res = await fetch("https://mindicador.cl/api/");
  const data = await res.json();
  console.log(data)
  let valor = document.getElementById("valores").value;
  let selectMoneda = document.getElementById("moneda");
  

 if (valor) {
    let moneda = (selectMoneda.options[selectMoneda.options.selectedIndex].innerHTML).toLowerCase();
    let valorMoneda = data[moneda].valor ;
    console.log(valorMoneda);
    let resultado = valor / valorMoneda;
    console.log(resultado);
    return;
  
 } 
 else {
    alert("Ingrese un valor");
    return;
 
 }

  return data;
} */

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
        

        convMoneda.innerHTML = ` 
          ${resultado.toFixed(2)} ${moneda[0].toUpperCase() + moneda.substring(1)}`;
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


  fetch("https://mindicador.cl/api/dolar")
   .then((response) => {
     if (response.ok) {
        
       return response.json();
     }
     throw new Error("Something went wrong");
   }).then ((data)=>{console.log(data.serie.slice(0, 10))})
 