const monto = document.querySelector("#monto");
const boton= document.querySelector("#boton");
const resultado= document.querySelector("#resultado");
const selector = document.querySelector("#selector")
var valorMoneda = 0 
var conDecimal = 0


boton.addEventListener("click", () => {
    fetch('https://mindicador.cl/api').then(function(response) {
        return response.json();
            }).then(function(data) {
            console.log(selector.value) //imprime el valor seleccionado en select
            console.log(data) //imprime la data que retorna la api
                
            for(var moneda in data){                    //recorre la respuesta de la api (cada objeto)
                if (moneda == selector.value){          //Evalua, si algun objeeto de la respuesta hace match con el value seeccionado, entra al if
                    console.log(data[moneda])           //va a buscar el objeto completo de la respuesta cuando haga match
                    console.log(data[moneda].nombre)   //imprime la propiedad nombre del objeto que hizo match
                    console.log(data[moneda].valor)     //imprime la propiedad valor del objeto que hizo match
                    valorMoneda = data[moneda].valor
                    conDecimal = valorMoneda.toFixed(2)     
         var suma = 0
          suma = Number(monto.value)*(valorMoneda);
          if(suma > 0) { 
          resultado.textContent = "Resultado: $" + suma 
          } else {
          resultado.textContent ="Ingresa monto superior a 0"
       }}}
            renderGrafica(selector.value);
        }).catch(function (e){
             alert(e.message);
             })
});

let myChart;

async function getMonedas(moneda) {
    const res = await fetch("https://mindicador.cl/api/"+(selector.value));
    const data =await res.json();
    var dias = []
    var valores = []
    var dataChart = []
    for (var dia in data['serie']){
        dias.push(data['serie'][dia].fecha)
        valores.push(data['serie'][dia].valor)
    }
    dataChart.push(dias)
    dataChart.push(valores)
    console.log(dataChart)
    return dataChart
   
}

async function renderGrafica(moneda){
    const dataGrafico = await getMonedas (moneda);
    const labels = dataGrafico[0];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: dataGrafico[1],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config = {
        type: "line",
        data
    };

    

    const chartDOM = document.getElementById("myChart");
    chartDOM.style.backgroundColor = "white";
    
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(chartDOM, config);

}





