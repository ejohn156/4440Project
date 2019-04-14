var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/current?city=Charlotte,NC&key=817a04bb05af4998ba8982692cc8a5ef'
new Vue({
  el: '#weather',
  data :{
      info: null,
      temp: 0,
      location: "Charlotte, NC",
      currentWeather: [],
      forecastArray: [],
      forecastLocation: "",
      searchType: "Current"
    },
  methods: {
    getCurrentWeather: function(){
      this.currentWeather = []
      var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/current?city='+this.location+'&key=817a04bb05af4998ba8982692cc8a5ef'
      console.log("current")
      this.$http.get(currentWeatherAPI).then((response) => {
        console.log(response.data.data[0])
        this.temp = response.data.data[0].temp
        this.location = response.data.data[0].city_name + ", " + response.data.data[0].country_code
        this.currentWeather.push(response.data.data[0])
      }).then(this.forceUpdate)
      },
      changeCity: function(event){
        console.log(this.location)
      },
      getWeatherForecast: function(){
        
        var forecastWeatherAPI = 'https://api.weatherbit.io/v2.0/forecast/daily?city='+this.location+'&key=817a04bb05af4998ba8982692cc8a5ef'
        this.forecastArray = []
        console.log("forecast")
        this.forecastLocation = this.location
        this.$http.get(forecastWeatherAPI).then((response) => {
          var forecastData = response.data.data
  
          forecastData.map((weather) => {
              console.log(weather)
              
              this.forecastArray.push(weather);
           });
          })
        },
        getWeatherInfo : function(){
          console.log("event" + event.target.value)
          if(this.searchType === "Current")
            this.getCurrentWeather
            else if(this.searchType === "Forecast")
            this.getWeatherForecast
        },
        onSearchChange(event) {
          this.searchType = event.target.value
          if(this.searchType === "Current")
          this.getCurrentWeather()
          else(this.searchType === "Forecast")
          this.getWeatherForecast()

      }
    },
    
    mounted() {
      this.getCurrentWeather()
    }

})