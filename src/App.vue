<template>
  <v-app 
  >
    <Navigation />
    
    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <h1 class="mx-4">All systems operational</h1>
          </v-col>
        </v-row>

        <v-row
          v-for="item in api.services" 
          :key="item.name"
        >
          <v-col>
            <StatusBlock 
              :title="item.name" 
              :description="item.description"
              :status="item.status"
              :message="item.message"
            />
          </v-col>
          
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import StatusBlock from './components/StatusBlock.vue';
  import Navigation from './components/Navigation.vue';

  export default {
    name: 'App',
    components: {
      StatusBlock,
      Navigation
    },
    data: function () {
      return {
        api: {
          services: [
            {
              name: "Jailbreak CS:GO server",
              description: "Lorem wfwafwafawfaf",
              status: 1,
              message: ""
            },
            {
              name: "Retakes #1 CS:GO server",
              description: "Lorem wfwafwafawfaf",
              status: 2,
              message: "Cyka blyat"
            },
            {
              name: "Zombie CS:GO server",
              description: "Lorem wfwafwafawfaf",
              status: 3,
              message: "Cyka blyat"
            },
          ]
        },
      }
    }
  };
</script>
