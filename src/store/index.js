import { createStore } from 'vuex'

export default createStore({
  state: {
    counter: 0,
    showSideBar: true
  },
  mutations: {

    increment(state){
      state.counter++
    },

    decrement(state){
      state.counter--
    },

    toggleSideMenu(state){
      state.showSideBar = !state.showSideBar
    },

  },
  actions: {
  },
  modules: {
  }
})
