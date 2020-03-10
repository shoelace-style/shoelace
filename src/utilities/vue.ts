//
// This directive works just like v-model but for Shoelace elements.
//
// See https://github.com/vuejs/vue/issues/7830 for why this is required.
//
// Config
//
//  import modelShoelace from './utils/model-shoelace.js';
//  Vue.directive('model-shoelace', modelShoelace);
//
// Usage
//
//  <your-input v-model-shoelace="name"></your-input>
//
import Vue from 'vue';

const wm = new WeakMap();

export default {
  bind(el, binding, vnode) {
    const inputHandler = event => Vue.set(vnode.context, binding.expression, event.target.value);
    wm.set(el, inputHandler);
    el.value = binding.value;
    el.addEventListener('input', inputHandler);
  },

  componentUpdated(el, binding) {
    el.value = binding.value;
  },

  unbind(el) {
    const inputHandler = wm.get(el);
    el.removeEventListener(el, inputHandler);
  }
};
