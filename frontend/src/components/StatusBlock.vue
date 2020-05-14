<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <a 
        v-if="port" 
        class="playerIndicator"
        :class="playerIndicatorColor"
        :href="joinLink"
        v-tooltip.bottom="{
          content: `
          <strong>${this.server_name}</strong><br><br>
          <span>${this.current_map}</span>`,
          classes: tooltipClasses,
          trigger: 'hover click focus',
          autoHide: false,
          delay: {
            show: 100,
            hide: 100
          }
        }">
        {{ playerIndicator }}
      </a>
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
        playerIndicator: "Getting player information...",
        server_name: "",
        current_map: "",
        max_players: "",
        playercount: "",
        server_ip: "",
        server_port: "",
        loading: false
      }
    },
    async mounted() {
      if (this.port)
        this.refresh()
    },
    methods: {
      refresh: async function() {
        
        this.loading = true;
        await axios.get(config.API_URL + '/servers/' + this.port)
          .then((response) => {
            let data = response.data
            console.log(process.env)

            this.playerIndicator = data.format + " players online"
            this.server_name = data.server_name
            this.current_map = data.current_map
            this.max_players = data.max_players
            this.playercount = data.playercount
            this.server_ip = data.ip
            this.server_port = data.port
            
            this.loading = false
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
      joinLink: function() {
        if ( this.port && !this.loading ) {
          return `steam://connect/${this.server_ip}:${this.server_port}`
        }
        return "#";
      },
      playerIndicatorColor: function() {
        if ( this.port && !this.loading ) {
          let p = (this.playercount / this.max_players) * 100

          if (p > 80) return "red--text"
          else if (p > 50) return "orange--text"
          else return "green--text"
        }
        return "neutral--text";
      },
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
  vertical-align: middle;
  justify-content: space-between;
  flex-wrap: wrap;
  user-select: none;

  & .v-card__title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
    
  & .v-card__subtitle {
    padding: 16px !important;
    margin-top: 0 !important;
  }

  .playerIndicator {
    font-size: 60%;
    text-decoration: none;
  }

  .neutral--text {
    color: #555 !important;
  }
}
</style>