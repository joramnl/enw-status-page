<template>
  <v-card
    shaped
  >
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
          return "Paritial Outage";
        } else {
          return "Full Outage";
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
