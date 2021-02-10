<template>
  <v-app>
    <v-navigation-drawer clipped app v-model="myDrawer">
      <v-list>
        <v-list-item v-for="(page, i) in pages" :to="page.to" :key="i">
          <v-list-item-icon>
            <v-icon>{{page.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{page.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left dense color="grey" app>
      <v-btn @click="myDrawer = !myDrawer" fab icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn fab icon>
        <v-icon large>mdi-youtube</v-icon>
      </v-btn>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field class="pt-4" append-icon="mdi-magnify" label="Search video"></v-text-field>
      <v-btn fab icon @click="changeWeather()">
        <v-icon v-if="this.$vuetify.theme.dark">mdi-weather-sunny</v-icon>
        <v-icon v-else>mdi-weather-night</v-icon>
      </v-btn>
      <v-btn @click="onLogout()" fab icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      
      
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data(){
    return{
      myDrawer: true,
      pages: [
        { icon: 'mdi-home', text: 'Home', to: '/' },
        { icon: 'mdi-home', text: "Crud", to: '/crud'},
        { icon: 'mdi-trash-can', text: "Sealant", to: '/sealant'},
        { icon: 'mdi-calculator', text: "Computation", to: '/computation'}
      ]
    }
  },
  methods:{
    onLogout(){
      this.CHANGE_USERINFO({})
      this.$router.push("/login")
    },
    changeWeather(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  created(){
    this.$vuetify.theme.dark = false
  }
}
</script>