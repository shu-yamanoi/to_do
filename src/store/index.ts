import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from './types'

Vue.use(Vuex)

const TODO_KEY  = 'todo'
const ID_KEY = 'todoId'
const allTodo = JSON.parse(localStorage.getItem(TODO_KEY) as string)

export default new Vuex.Store({
  state: {
    todos: [] as Todo[],
  },

  mutations: {
    addTodo(state, newTodo) {
      let id = Number(localStorage.getItem(ID_KEY))
      const todo: Todo = {
        title: newTodo.title,
        id: id,
        priority: newTodo.priority,
        status: 'TODO'
      }
      id++
      state.todos.push(todo)
      localStorage.setItem(TODO_KEY, JSON.stringify(state))
      localStorage.setItem(ID_KEY, id.toString())
    },

    changeStatus(state, todo) {
      for(let i = 0; i < state.todos.length; i++) {
        if(state.todos[i].id === todo.id) {
          state.todos[i].status = todo.status === 'TODO' 
            ? 'DOING'
            : 'DONE'
          state.todos.splice(i, 1, state.todos[i])
          localStorage.setItem(TODO_KEY, JSON.stringify(state))
          break
        }
      }
    },

    deleteTodo(state, todo) {
      const targetIndex: number = state.todos.findIndex(_todo => _todo.id === todo.id)
      state.todos.splice(targetIndex, 1)
      localStorage.setItem(TODO_KEY, JSON.stringify(state))
    },

    updataTodo(state, todo) {
      const targetTodo: Todo | undefined = state.todos.find(_todo => _todo.id === todo.id)
      if(targetTodo) {
        if(todo.title) {
          targetTodo.title = todo.title
        }else if(todo.priority) {
          targetTodo.priority = todo.priority
        }
      localStorage.setItem(TODO_KEY, JSON.stringify(state))
      }
    },

    setTodo(state) {
      if(allTodo) {
        this.replaceState(allTodo)
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

