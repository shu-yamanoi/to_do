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
        title: newTodo.title,
        id: state.idState++,
        priority: newTodo.priority,
        status: 'TODO'
      }
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

    deleteTodo(state, todo) {
      const newTodos: Todo[] = state.todos.filter(_todo => _todo.id !== todo.id)
      state.todos.splice(0)
      Array.prototype.push.apply(state.todos, newTodos)
    },

    updataTodo(state, todo) {
      for(let i = 0; i < state.todos.length; i++) {
        if(state.todos[i].id === todo.id) {
          if(todo.title) {
            state.todos[i].title = todo.title
          }else if(todo.priority) {
            state.todos[i].priority = todo.priority
          }
          state.todos.splice(i, 1, state.todos[i])
          break
        }
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
    }
  },
  modules: {
  }
})
