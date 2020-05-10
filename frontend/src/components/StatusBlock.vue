<template>
  <v-card>
    <v-card-title>
      {{ title }}
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
  import StatusTimeline from './StatusTimeline'

  export default {
    name: 'StatusBlock',
    components: {
        StatusTimeline
    },
    props: {
      title: String,
      description: String,
      status: Number,
      message: String
    },
    computed: {
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
    
  & .v-card__subtitle {
    padding: 16px !important;
    margin-top: 0 !important;
  }
}
</style>