import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


type Todo = {
  title: string;
  id: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'DOING' | 'DONE';
}


export default new Vuex.Store({
  state: {
    todos: [] as Todo[],
    doings: [] as Todo[],
    dones: [] as Todo[],
    idState: 0 as number
  },

  mutations: {
    create(state, newTodo) {
      const todo = {
        title: '',
        id: 0,
        priority: 'LOW' as 'HIGH' | 'MEDIUM' | 'LOW',
        status: 'TODO' as 'TODO'
      }
      todo.title = newTodo.title
      todo.priority = newTodo.priority
      todo.id = state.idState
      state.todos.push(todo)
      state.idState++
    },
    

    add(state, todo) {
      if(todo.status === 'TODO') {
        for(let i = 0; i < state.todos.length; i++) {
          if(state.todos[i].id === todo.id) {
            const todo = {
              title: state.todos[i].title,
              id: state.todos[i].id,
              status: 'DOING' as 'DOING',
              priority: state.todos[i].priority as 'HIGH' | 'MEDIUM' | 'LOW'
            }
            state.doings.push(todo)
            state.todos.splice(i, 1)
            break
          }
        }
      }else if(todo.status === 'DOING') {
        for(let i = 0; i < state.doings.length; i++) {
          if(state.doings[i].id === todo.id) {
            const todo = {
              title: state.doings[i].title,
              id: state.doings[i].id,
              status: 'DONE' as 'DONE',
              priority: state.doings[i].priority as 'HIGH' | 'MEDIUM' | 'LOW'
            }
            state.dones.push(todo)
            state.doings.splice(i, 1)
            break
          }
        }
      }
    },

    delete(state, todo) {
      if(todo.status === 'TODO') {
        for(let i = 0; i < state.todos.length; i++) {
          if(state.todos[i].id === todo.id) {
            state.todos.splice(i, 1)
            break
          }
        }
      }else if(todo.status === 'DOING') {
        for(let i = 0; i < state.doings.length; i++) {
          if(state.doings[i].id === todo.id) {
            state.doings.splice(i, 1)
            break
          }
        }
      }else {
        for(let i = 0; i < state.dones.length; i++) {
          if(state.dones[i].id === todo.id) {
            state.dones.splice(i, 1)
            break
          }
        }
      }
    }
  },

  actions: {
    create({ commit }, newTodo) {
      commit('create', newTodo)
    },

    ToNextState({ commit }, todo) {
      commit('add', todo)
    },

    DeleteTodo({ commit }, todo) {
      commit('delete', todo)
    }
  },
  modules: {
  }
})
