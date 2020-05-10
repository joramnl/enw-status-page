<style lang="scss" scoped>
  .status-icon {
    border-radius:50%;
    padding:16px;

    &.problems {
      background:orange;
    }

    &.good {
      background: green;
    }

    &.loading {
      background: lightskyblue;
    }
  }
</style>

<template>
  <v-col
    align="center"
    justify="center"
    class="mt-5"
  >
    <v-fade-transition>
      <v-icon class="status-icon" :class="iconClass" size="64">
        {{ icon }}
      </v-icon>
    </v-fade-transition>
    <v-fade-transition>
        <h1 class="mt-5">{{ message }}</h1>
    </v-fade-transition>
  </v-col>
</template>

<script>
  export default {
    name: 'StatusMessage',
    props: {
      problems: Boolean,
      loading: Boolean
    },
    computed: {
      iconClass: function() {
        return {
          good: !this.problems,
          problems: this.problems,
          loading: this.loading
        }
      },
      icon: function () {
        if (this.loading) {
          return 'mdi-clock';
        } else if (this.problems) { 
          return 'mdi-sign-caution';
        } else {
          return 'mdi-check-bold'
        }
      },
      message: function() {
        if (this.loading) {
          return "Loading, please wait..."
        } else if (this.problems) {
          return "Some of our services are experiencing problems";
        } else {
          return "All services are operational";
        }
      }
    }
  }
</script>