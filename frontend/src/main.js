import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  data: {
    window: {
      width: 0,
      height: 0
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
    }
  }
}).$mount('#app')
