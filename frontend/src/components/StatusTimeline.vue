<template>
  <div>
    <svg 
      preserveAspectRatio="none"
      :viewBox="viewBox"
    >
      <rect 
        v-for="index in 90" 
        :key="index"
        height="34"
        width="3" 
        :class="'day-'+(index-1)"
        :x="index * 5 - 5" 
        y="0" 
        fill="#43b581"
        v-tooltip.bottom="{
          content: `
          <strong>${getDate(index - 1)}</strong><br>
          <span>No downtime recorded on this day.</span>
          `,
          classes: tooltipClasses,
          delay: {
            show: 100,
            hide: 100
          }
        }"
      ></rect>
    </svg>
    <div class="label">
      <span>{{ dayCount }} days ago</span>
      <span class="spacer"></span>
      <span>Today</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StatusTimeline',
    data: function() {
      return {
        rectWidth: 3,
        rectPadding: 2
      }
    },
    computed: {
      tooltipClasses: function() {
        let classes = [];
        classes.push((this.$vuetify.theme.dark) ? 'dark' : 'light');
        return classes;
      },
      uptime: function () {
        return 99.99;
      },
      dayCount: function () {
        if (this.$root.window.width <= 600)
        {
          return 30;
        }
        else if (this.$root.window.width <= 1024 )
        {
          return 60;
        }
        else
        {
          return 90;
        }
      },
      viewBox: function() {
        var viewBox = [];

        if (this.dayCount === 90) 
            viewBox.push(0);
        else 
        {
            var offset = 90 - this.dayCount;
            viewBox.push((offset * this.rectWidth) + (this.rectPadding * (offset)));
        }
        viewBox.push(0);
        viewBox.push((this.rectWidth * this.dayCount) + (this.rectPadding * (this.dayCount - 1)));
        viewBox.push(34);
        return viewBox.join(' ');
      }
    },
    methods: {
      getDate: function (days) {
        let offset = 89 - days;
        let today = new Date();
        let temp = new Date();
        temp.setDate(today.getDate() - offset);
        return temp.getDate() + " " + temp.toLocaleString('en', { month: 'long' }) + " " + temp.getFullYear();
      }
    }
  }
</script>

<style lang="scss" scoped>
  svg {
    height: 34px;
    width: 100%;
    & rect:hover {
      fill: #ccc;
    }
  }

  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #555;
  }

  .spacer {
    flex-grow: 1;
    height: 1px;
    margin: 0 8px;
  }
</style>