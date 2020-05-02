import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [] as Todo[],
    idState: 0
  },

  mutations: {
    addTodo(state, newTodo) {
      const todo: Todo = {
        title: '',
        id: 0,
        priority: 'LOW',
        status: 'TODO'
      }
      todo.title = newTodo.title
      todo.priority = newTodo.priority
      todo.id = state.idState++
      state.todos.push(todo)
    },
    

    changeStatus(state, todo) {
      for(let i = 0; i < state.todos.length; i++) {
        if(state.todos[i].id === todo.id) {
          state.todos[i].status = todo.status === 'TODO' 
            ? 'DOING'
            : 'DONE'
          state.todos.splice(i, 1, state.todos[i])
          break
        }
      }
    },

    delete(state, todo) {
      const newTodos: Todo[] = state.todos.filter(_todo => _todo.id !== todo.id)
      state.todos.splice(0)
      Array.prototype.push.apply(state.todos, newTodos)
    }
  },

  actions: {
    add({ commit }, newTodo) {
      commit('addTodo', newTodo)
    },

    ToNextState({ commit }, todo) {
      commit('changeStatus', todo)
    },

    DeleteTodo({ commit }, todo) {
      commit('delete', todo)
    }
  },
  modules: {
  }
})
