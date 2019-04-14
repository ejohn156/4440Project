var currentPage = '<input v-model="location" placeholder="enter a city"><button v-on:click="changeCity($event)">Get Current Weather</button><h3  v-for="weather in currentWeather">Current Weather: {{ currentWeather[0].temp }}</h3></div>'
new Vue({
    el: '#current',
    data: {
      info: null,
      temp: 0,
      template: currentPage,
      location: "Charlotte, NC",
      searchedLocation: "Charlotte, NC",
      currentWeather: [],
      forecastArray: [],
      forecastLocation: "",
      searchType: "Current"
    },
    methods: {
      getCurrentWeather: function () {
        this.currentWeather = []
        var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/current?city=' + localStorage.getItem("location") + '&key=817a04bb05af4998ba8982692cc8a5ef'
        console.log("current")
        this.$http.get(currentWeatherAPI).then((response) => {
          console.log(response.data.data[0])
          this.temp = response.data.data[0].temp
          this.currentWeather.push(response.data.data[0])
        })
      },
      changeCity: function () {
        var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/current?city=' + this.location + '&key=817a04bb05af4998ba8982692cc8a5ef'
        
        this.$http.get(currentWeatherAPI).then((response) => {
          localStorage.setItem("location",response.data.data[0].city_name + ", " + response.data.data[0].country_code)
          this.location = localStorage.getItem("location")
          this.searchedLocation = this.location
          
        })
        if (localStorage.getItem("searchType") == "Current")
          this.getCurrentWeather()
          
        else if (localStorage.getItem("searchType") == "Forecast")
          this.getWeatherForecast()
      },
      getWeatherForecast: function () {
        this.forecastArray = []
        console.log("forecast")
        this.forecastLocation = localStorage.getItem("location")
        var forecastWeatherAPI = 'https://api.weatherbit.io/v2.0/forecast/daily?city=' + this.forecastLocation + '&key=817a04bb05af4998ba8982692cc8a5ef'
        this.$http.get(forecastWeatherAPI).then((response) => {
          var forecastData = response.data.data
          this.location = localStorage.getItem("location")
          forecastData.map((weather) => {
            console.log(weather)
  
            this.forecastArray.push(weather);
          });
        })
      },
      getWeatherInfo: function () {
        
        if (localStorage.getItem("searchType") === "Current")
          this.getCurrentWeather()
        else if (localStorage.getItem("searchType") === "Forecast")
          this.getWeatherForecast()
      },
      onSearchChange(event) {
        localStorage.setItem("searchType", event.target.value)
        if (this.searchType === "Current")
          this.getCurrentWeather()
        else (this.searchType === "Forecast")
        this.getWeatherForecast()
  
      }
    },
  
    mounted() {
      localStorage.setItem("location", "Charlotte, US")
      localStorage.setItem("searchType", "Current")
      this.getWeatherInfo()
    },
    watch: {
      location(newLocation) {
        localStorage.location = newLocation;
        this.location = newLocation
      },
      searchType(newSearchType){
        localStorage.searchType = newSearchType
        this.searchType = newSearchType
      },
      // forecastArray(newForecastArray){
      //   this.forecastArray = []
      //   newForecastArray.map((forecast) => {
      //     this.forecastArray.push(forecast)
      //   })
      // }
    },
    template : {
        currentContent: '<input v-model="location" placeholder="enter a city"><button v-on:click="changeCity($event)">Get Current Weather</button><h3  v-for="weather in currentWeather">Current Weather: {{ currentWeather[0].temp }}</h3></div>'
    }
  
  })