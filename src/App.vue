<template>
  <v-app>
    <weather/>
  </v-app>
</template>

<script>
import weather from './components/weather'

export default {
  name: 'App',
  components: {
    weather,
 }
}
</script>
