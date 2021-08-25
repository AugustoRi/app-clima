window.addEventListener('load', () =>{
  let longitude;
  let latitude;
  let localizacaoTimezone = document.querySelector('.localizacao-timezone');
  let temperaturaGraus = document.querySelector('.temperatura-graus');
  let temperaturaDescricao = document.querySelector('.temperatura-descricao');
  let grausWrap = document.querySelector('.graus-wrap');
  let temperaturaUnidadeMedida = document.querySelector('.graus-wrap span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=83bdfd2fd84f0277c732424aae1b4e7e`;
      
      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        //temp em Kelvin
        const temp = data.main.temp;

        //calculo temperatura em celsius
        let tempCelsiusCalculo = temp - 273.15;
        let tempCelsius = parseFloat(tempCelsiusCalculo.toFixed(2));

        //calculo temperatura em fahrenheit
        let tempFahrenheitCalculo = (temp * 1.8) - 459.67;
        let tempFahrenheit = parseFloat(tempFahrenheitCalculo.toFixed(2));
        
        //armazenando os dados da API
        const name = data.name;
        const description = data.weather[0].description; 
        const icon = data.weather[0].main;
        const country = data.sys.country;

        //trazendo os dados da API e passando para o front-end
        localizacaoTimezone.innerHTML = `${name} - ${country}`;
        temperaturaGraus.innerHTML = tempCelsius;
        temperaturaDescricao.innerHTML = description;

        //evento de click para mudar a unidade de medida de temperatura
        grausWrap.addEventListener('click',()=>{
          //temperatura modificada para Fahrenheit
          if(temperaturaUnidadeMedida.innerHTML === "C"){
            temperaturaGraus.innerHTML = temp;
            temperaturaUnidadeMedida.innerHTML = "F";
          }
          //temperatura modificada para Kelvin
          else if(temperaturaUnidadeMedida.innerHTML === "F"){
            temperaturaGraus.innerHTML = tempFahrenheit;
            temperaturaUnidadeMedida.innerHTML = "K";
          }
          //temperatura modificada para Celsius
          else{
            temperaturaGraus.innerHTML = tempCelsius;
            temperaturaUnidadeMedida.innerHTML = "C";
          }
        });
      });
    });
  }
});