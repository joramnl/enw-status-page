<template>
  <v-card>
    <v-card-title>
      {{ title }} 
      <span 
        v-if="port" 
        class="playerIndicator" 
        v-tooltip.bottom="{
          content: `
          <strong>${this.server_name}</strong><br><br>
          <span>Current map: <i>${this.current_map}</i></span>
          `,
          classes: tooltipClasses,
          delay: {
            show: 100,
            hide: 100
          }
        }">
        {{ playerIndicator }}
      </span>
    </v-card-title>
    <v-card-subtitle>
      <span :class="componentColor">{{ componentStatus }}</span>
    </v-card-subtitle>
    <v-card-text>
      <StatusTimeline />
    </v-card-text>
  </v-card>
</template>

<script>
  const axios = require('axios')

  import StatusTimeline from './StatusTimeline'
  import config from '../../config'

  export default {
    name: 'StatusBlock',
    components: {
        StatusTimeline
    },
    data: function() {
      return {
        playerIndicator: "Loading...",
        server_name: "",
        current_map: "",
        max_players: "",
        playercount: "",
        loading: false
      }
    },
    async mounted() {
      this.refresh()
    },
    methods: {
      refresh: async function() {
        this.loading = true;
        await axios.get(config.API_URL + '/servers/' + this.port)
          .then((response) => {
            let data = response.data

            this.playerIndicator = data.format + " players online"
            this.server_name = data.server_name
            this.current_map = data.current_map
            this.max_players = data.max_players
            this.playercount = data.playercount
          })
          .catch((error) => console.error(error))
      }
    },
    props: {
      title: String,
      description: String,
      status: Number,
      message: String,
      port: Number
    },
    computed: {
      tooltipClasses: function() {
        let classes = [];
        classes.push((this.$vuetify.theme.dark) ? 'dark' : 'light');
        return classes;
      },
      componentStatus: function () {
        if (this.status == 1) {
          return "Operational";
        } else if (this.status == 2) {
          return "Service appears to be down";
        } else {
          return "Service is down";
        }
      },
      componentColor: function () {
        if (this.status == 1) {
          return "green--text";
        } else if (this.status == 2) {
          return "orange--text";
        } else {
          return "red--text";
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.v-card {
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: space-between;
  flex-wrap: wrap;

  & .v-card__title {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
  }
    
  & .v-card__subtitle {
    padding: 16px !important;
    margin-top: 0 !important;
  }

  .playerIndicator {
    font-size: 60%;
    color: #555;
    margin-left: 8px;
  }
}
</style>