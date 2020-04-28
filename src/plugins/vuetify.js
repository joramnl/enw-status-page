import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);
Vue.use(require('vue-cookies'))


let darkmode = true;

if (Vue.$cookies.isKey('theme')) {
    let theme = Vue.$cookies.get('theme');

    if (theme == "light") darkmode = false;
} else {
    Vue.$cookies.set('theme', 'dark', '10y')
}

export default new Vuetify({
    theme: {
      dark: darkmode,
    },
});
