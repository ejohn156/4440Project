<template>
<div>
    <v-container grid-list-x1>
            <v-card style="background-color:#1b5e20;">
                <v-card-title primary-title>
                    <h1 class="headline mb-0" style="color:gold">Weather Simulation</h1>
                </v-card-title>
                    <v-layout row>
                        <v-flex pa-12 style="align-content: center;padding-bottom: 3%">
                            <vue-p5 v-on="this" style="margin-left: 8%" class="justify-center"></vue-p5>
                        </v-flex>
                    </v-layout>
            </v-card>
        </v-container>
        </div>
</template>
<script>
import vueP5 from "vue-p5"
export default {
    name: 'sim',
    data: function(){return{weatherData: []}},
    methods: {
        setup(sketch) {
            sketch.createCanvas(700, 500);
            sketch.background(0);
            
        },
    },
    props: {
        currentWeather: Object,
        forecastArray: Object
    },
    components:{
        "vue-p5": vueP5
    }

}
</script>
