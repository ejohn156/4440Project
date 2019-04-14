var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=817a04bb05af4998ba8982692cc8a5ef'
new Vue({
  el: '#forecast',
  data :{
      info: null,
      weatherArray: [],
      forecastLocation: ""
    },
  methods: {
    getWeatherForecast: function(forecastLocation){
      console.log("forecast")
      this.forecastLocation = forecastLocation
      this.$http.get(currentWeatherAPI).then((response) => {
        var forecastData = response.data.data

        forecastData.map((weather) => {
            console.log(weather)
            
            this.weatherArray.push(weather);
         });
         })
       },
      
    
},
    mounted() {
      this.getWeatherForecast("Charlotte, US")
      this.ge
    }

})