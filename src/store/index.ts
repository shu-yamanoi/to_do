import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


type Todo = {
  title: string;
  id: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  state: 'TODO' | 'DOING' | 'DONE';
}


export default new Vuex.Store({
  state: {
    todos: [] as Todo[],
    doings: [] as Todo[],
    dones: [] as Todo[],
    idState: 0 as number
  },

  mutations: {
    addTodo(state, newTodo) {
      const todo = {
        title: '',
        id: 0,
        priority: 'LOW' as 'HIGH' | 'MEDIUM' | 'LOW',
        state: 'TODO' as 'TODO'
      }
      todo.title = newTodo.title
      todo.priority = newTodo.priority
      todo.id = state.idState
      state.todos.push(todo)
      state.idState++
    },
    
    addDoing(state, id) {
      for(let i = 0; i < state.todos.length; i++) {
        if(state.todos[i].id === id) {
          const todo = {
            title: state.todos[i].title,
            id: state.todos[i].id,
            state: 'DOING' as 'DOING',
            priority: state.todos[i].priority as 'HIGH' | 'MEDIUM' | 'LOW'
          }
          state.doings.push(todo)
          state.todos.splice(i, 1)
          break
        }
      }
    },

    addDone(state, id) {
      for(let i = 0; i < state.doings.length; i++) {
        if(state.doings[i].id === id) {
          const todo = {
            title: state.doings[i].title,
            id: state.doings[i].id,
            state: 'DONE' as 'DONE',
            priority: state.doings[i].priority as 'HIGH' | 'MEDIUM' | 'LOW'
          }
          state.dones.push(todo)
          state.doings.splice(i, 1)
          break
        }
      }
    },

    deleteTodo(state, id) {
      for(let i = 0; i < state.todos.length; i++) {
        if(state.todos[i].id === id) {
          state.todos.splice(i, 1)
          break
        }
      }
    },
    
    deleteDoing(state, id) {
      for(let i = 0; i < state.doings.length; i++) {
        if(state.doings[i].id === id) {
          state.doings.splice(i, 1)
          break
        }
      }
    },

    deleteDone(state, id) {
      for(let i = 0; i < state.dones.length; i++) {
        if(state.dones[i].id === id) {
          state.dones.splice(i, 1)
          break
        }
      }
    }
  },

  actions: {
    create({ commit }, newTodo) {
      commit('addTodo', newTodo)
    },

    toNextState({ commit }, todo) {
      const id = todo.id
      const state = todo.state
      if(state === 'TODO') {
        commit('addDoing', id)
      }else if(state === 'DOING') {
        commit('addDone', id)
      } 
    },

    deleteTodo({ commit }, todo) {
      const id = todo.id
      const state = todo.state
      if(state === 'TODO') {
        commit('deleteTodo', id)
      }else if(state === 'DOING') {
        commit('deleteDoing', id)
      }else {
        commit('deleteDone', id)
      }
    }
  },
  modules: {
  }
})
