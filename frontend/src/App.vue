<style lang="scss">
  @import './scss/tooltip.scss';
</style>

<template>
  <v-app>
    <Navigation />

    <v-content>
      <v-container>
        <v-row>
          <v-fade-transition>
            <StatusMessage :problems="problems" :loading="loading" />
          </v-fade-transition>
        </v-row>


        <v-fade-transition>
          <v-row
            align="center"
            justify="center"
            v-if="loading"
          >
            <v-col md="4">
              <v-card loading>
                <v-card-title>
                  Loading...
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-fade-transition>

        <v-fade-transition group>
          <v-row
            v-for="item in api.services" 
            :key="item.name"
            align="center"
            justify="center"
          >
            <v-col
              xl="6"
              lg="12"
            >
              <StatusBlock 
                :title="item.name" 
                :description="item.description"
                :status="item.status"
                :message="item.message"
                :port="27015"
              />
            </v-col>
          </v-row>
        </v-fade-transition>
      </v-container>
    </v-content>
    <v-footer
      class="mt-5"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} — <strong v-tooltip="'You have ' + 1 + ' new messages.'">Joram</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  const axios = require('axios');

  import StatusBlock from './components/StatusBlock.vue';
  import StatusMessage from './components/StatusMessage.vue';
  import Navigation from './components/Navigation.vue';

  export default {
    name: 'App',
    components: {
      StatusBlock,
      StatusMessage,
      Navigation
    },
    mounted() {
      this.refresh();
    },
    data: function () {
      return {
        api: {
          services: []
        },
        loading: true
      }
    },
    computed: {
      problems: function() {
        let problems = 0;

        this.api.services.forEach(element => {
          if (element.status != 1) problems++;
        });

        return problems != 0;
      }
    },
    watch: {
        loading: function(val) {
            if (!val) console.log("done loading")
        }
    },
    methods: {
      refresh: function () {
          this.loading = true;
          this.api.services = [];

          axios({
            url: "https://api.uptimerobot.com/v2/getMonitors",
            data: {
              api_key: "ur916908-04893e9cae7e4ac09fe5dbdb"
            },
            method: "POST"
          })
          .then((response) => {
            response.data.monitors.forEach(element => {
              let service = {};
              service.name = element.friendly_name;

              switch (element.status) {
                case 2:
                  service.status = 1;
                  break;
                case 8:
                  service.status = 2;
                  break;
                default:
                  service.status = 3;
                  break;
              }

              this.api.services.push(service);
              this.api.services.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              })
            });
          })
          .catch((error) => {
            console.error(error);
          })
          .then(() => {
            this.loading = false;
          })

          this.wait();
      },
      wait: function() {
        setTimeout(() => {
          this.refresh();
        }, 300000)
      }
    }
  };
</script>
