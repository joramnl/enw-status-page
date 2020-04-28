<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>
      <span :class="componentColor">{{ componentStatus }}</span>
    </v-card-subtitle>
    <v-card-text
      v-if="message"
    >
      {{ message }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'StatusBlock',
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
