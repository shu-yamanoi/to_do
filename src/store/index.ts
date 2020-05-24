import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [] as Todo[],
  },

  mutations: {
    addTodo(state, newTodo) {
      let idState = Number(localStorage.getItem('idState'))
      const todo: Todo = {
        title: newTodo.title,
        id: idState,
        priority: newTodo.priority,
        status: 'TODO'
      }
      idState++
      state.todos.push(todo)
      localStorage.setItem('allState', JSON.stringify(state))
      localStorage.setItem('idState', idState.toString())
    },

    changeStatus(state, todo) {
      for(let i = 0; i < state.todos.length; i++) {
        if(state.todos[i].id === todo.id) {
          state.todos[i].status = todo.status === 'TODO' 
            ? 'DOING'
            : 'DONE'
          state.todos.splice(i, 1, state.todos[i])
          localStorage.setItem('allState', JSON.stringify(state))
          break
        }
      }
    },

    deleteTodo(state, todo) {
      const targetIndex: number = state.todos.findIndex(_todo => _todo.id === todo.id)
      state.todos.splice(targetIndex, 1)
      localStorage.setItem('allState', JSON.stringify(state))
    },

    updataTodo(state, todo) {
      const targetTodo: Todo | undefined = state.todos.find(_todo => _todo.id === todo.id)
      if(targetTodo) {
        if(todo.title) {
          targetTodo.title = todo.title
        }else if(todo.priority) {
          targetTodo.priority = todo.priority
        }
      localStorage.setItem('allState', JSON.stringify(state))
      }
    },

    setTodo(state) {
      if(localStorage.getItem('allState')) {
        const allState = JSON.parse(localStorage.getItem('allState') as string)
        this.replaceState(allState)
      }
    }
  },

  actions: {
    add({ commit }, newTodo) {
      commit('addTodo', newTodo)
    },

    toNextStatus({ commit }, todo) {
      commit('changeStatus', todo)
    },

    delete({ commit }, todo) {
      commit('deleteTodo', todo)
    },

    update({ commit }, todo) {
      commit('updataTodo', todo)
    },

    doSetState({ commit }) {
      commit('setTodo')
    }
  }
})

