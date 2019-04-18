<template>
<div id="sim">
    <v-container grid-list-x1>
            <v-card style="background-color:#1b5e20;">
                <v-card-title primary-title>
                    <h1 class="headline mb-0" style="color:gold">Weather Simulation</h1>
                </v-card-title>
                    <v-layout row>
                        <v-flex pa-12 style="align-content: center;padding-bottom: 3%">
                            <vue-p5 style="margin-left: 6%" class="justify-center" v-on="this"></vue-p5>
                        </v-flex>
                    </v-layout>
            </v-card>
        </v-container>
        </div>
</template>
<script>
export default {
    name: '#sim',
    data: {weatherData: []},
    methods: {
        setup(sketch) {
            sketch.createCanvas(1000, 500);
            sketch.background(0);
            // sketch.line(0, 0, width, height);
        }
    },
    mounted() {
        var currentWeatherAPI = 'https://api.weatherbit.io/v2.0/current?city=' + localStorage.getItem("location") + '&key=817a04bb05af4998ba8982692cc8a5ef'
      //console.log("current")
      this.$http.get(currentWeatherAPI).then((response) => {
        //console.log(response.data.data[0])
        this.weatherData.push(response.data.data[0])
      })
      console.log(this.weatherData)
      },

}
</script>
