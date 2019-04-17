var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/current?city=Charlotte,NC&key=817a04bb05af4998ba8982692cc8a5ef'
new Vue({
  el: '#weather',
  data: {
    info: null,
    temp: 0,
    location: "Charlotte, US",
    searchedLocation: "Charlotte, US",
    currentWeather: [],
    forecastArray: [],
    forecastLocation: "",
    searchOptions: ["Current", "Forecast"],
    searchMethodOptions: ["City", "Voice Command"],
    searchType: "Current",
    searchMethod: "City"
  },
  
  methods: {
    
    getCurrentWeather: function () {
      this.currentWeather = []
      var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/current?city=' + localStorage.getItem("location") + '&key=817a04bb05af4998ba8982692cc8a5ef'
      //console.log("current")
      this.$http.get(currentWeatherAPI).then((response) => {
        //console.log(response.data.data[0])
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
      //console.log("forecast")
      this.forecastLocation = localStorage.getItem("location")
      var forecastWeatherAPI = 'https://api.weatherbit.io/v2.0/forecast/daily?city=' + this.forecastLocation + '&key=817a04bb05af4998ba8982692cc8a5ef'
      this.$http.get(forecastWeatherAPI).then((response) => {
        var forecastData = response.data.data
        this.location = localStorage.getItem("location")
        forecastData.map((weather) => {
          //console.log(weather)

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
    onSearchMethodChange(event) {
      console.log(this.searchMethod)
      //localStorage.setItem("searchType", event.target.value)
      

    },
    changeToCurrent(){
      this.searchType = "Current"
      localStorage.setItem("searchType", "Current")
      this.getCurrentWeather()
    },
    changeToForecast(){
      this.searchType = "Forecast"
      localStorage.setItem("searchType", "Forecast")
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
    searchMethod(newSearchMethod){
      localStorage.searchMethod = newSearchMethod
      this.searchMethodType = newSearchMethod
    },
    searchType(newSearchType){
      localStorage.searchType = newSearchType
      this.searchMethodType = newSearchType
    },
    // forecastArray(newForecastArray){
    //   this.forecastArray = []
    //   newForecastArray.map((forecast) => {
    //     this.forecastArray.push(forecast)
    //   })
    // }
  }

})