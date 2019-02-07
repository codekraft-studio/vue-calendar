import './styles/index.scss'
import VueCalendar from './components/VueCalendar'

export default function install(Vue, options = {}) {
  const moment = options && options.moment
    ? options.moment
    : require('moment');

  Object.defineProperties(Vue.prototype, {
    $moment: {
      get() {
        return moment;
      }
    }
  })

  // TODO: This is glitchy and does not work with normal $slots
  // must check why this is happening or find another way (du yu no da wai?)
  //
  // Solve nested named slots inheritance
  // @see https://github.com/vuejs/vue/pull/7765#issuecomment-401985464
  Vue.prototype._b = (function (bind) {
    return function(data, tag, value) {
      if (value) {
        for (let key in value) {
          if (value.hasOwnProperty(key) && key.startsWith('$')) {
            const prop = key.substr(1)
            data[prop] = value[key];
            delete value[key];
          }
        }
      }
      return bind.apply(this, arguments);
    };
  })(Vue.prototype._b);

  Vue.component('VueCalendar', VueCalendar)
}
