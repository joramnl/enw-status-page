<template>
  <div>
    <v-app-bar app dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Extreme-Network</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="changeTheme">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item>
          Work in Progress
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    data: function () {
      return {
        drawer: false
      }
    },
    methods: {
      changeTheme: function () {
        // Set to light
        if (this.$vuetify.theme.dark) {
          this.$vuetify.theme.dark = false;
          this.$cookies.set('theme', 'light', '10y')
        }

        // Set to dark
        else {
          this.$vuetify.theme.dark = true;
          this.$cookies.set('theme', 'dark', '10y')
        }
      }
    }
  }
</script>
