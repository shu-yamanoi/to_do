<template>
  <div class="Home">
    <div class="todoTable">
      <div class="todoHeader">
        to do
      </div>
      <ul>
        <li v-for="todoItem in todoItems" :key="todoItem.id">
          <div class="todoList">
            <div class="todoDeleteButton" @click="deleteTodoHandle(todoItem.status, todoItem.id)">
              ×
            </div>
            <div class="todoTitle">
              {{ todoItem.title }}
            </div>
            <div :class="priorityClass(todoItem.priority)">
              {{ todoItem.priority }}
            </div>
            <div class="toDoing" @click="toNextStatus(todoItem.status, todoItem.id)">
              →
            </div>
          </div>
        </li>
      </ul>
      <New />
    </div>
    <div class="doingTable">
      <div class="doingHeader">
        doing
      </div>
      <ul>
        <li v-for="doingItem in doingItems" :key="doingItem.id">
          <div class="todoList">
            <div class="doingDeleteButton" @click="deleteTodoHandle(doingItem.status, doingItem.id)">
              ×
            </div>
            <div class="todoTitle">
              {{ doingItem.title }}
            </div>
            <div :class="priorityClass(doingItem.priority)">
              {{ doingItem.priority }}
            </div>
            <div class="toDone" @click="toNextStatus(doingItem.status, doingItem.id)">
              →
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="doneTable">
      <div class="doneHeader">
        done
      </div>
      <ul>
        <li v-for="doneItem in doneItems" :key="doneItem.id">
          <div class="todoList">
            <div class="doneDeleteButton" @click="deleteTodoHandle(doneItem.status, doneItem.id)">
              ×
            </div>
            <div class="todoTitle">
            {{ doneItem.title }}
            </div>
            <div :class="priorityClass(doneItem.priority)">
              {{ doneItem.priority }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import New from './New.vue'
import { Todo } from '../store/types'

@Component({

  components: {
    New
  },

  computed: {
    ...mapState(["todos"])
  },

})
export default class Home extends Vue {
  

  array = ['a', 'v']

  toNextStatus(status: 'TODO' | 'DOING', id: number) {
    this.$store.dispatch('ToNextState', {
      status: status,
      id: id
    })
  }

  deleteTodoHandle(status: 'TODO' | 'DOING' | 'DONE', id: number) {
    this.$store.dispatch('DeleteTodo', {
      id: id,
      status: status
    })
  }

  priorityClass(priority: 'HIGH' | 'MEDIUM' | 'LOW'): string {
    switch(priority) {
      case 'HIGH':
        return 'highPriority'
      case 'MEDIUM':
        return 'mediumPriority'
      case 'LOW':
        return'lowPriority'
    }
  }

  get todoItems() {
    return this.$store.state.todos.filter((todo: Todo) => todo.status === 'TODO')
  }

  get doingItems() {
    return this.$store.state.todos.filter((todo: Todo) => todo.status === 'DOING')
  }

  get doneItems() {
    return this.$store.state.todos.filter((todo: Todo) => todo.status === 'DONE')
  }
}
</script>
<style>

  .Home {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-right: 50px;
    height: 100%;
  }

  .todoTable, .doingTable, .doneTable {
    margin: 0px 60px;
    height: 100vh;
    padding: 0px, 20px;
    width: 300px;
  }

  .todoHeader, .doingHeader, .doneHeader {
    font-size: 40px;
    padding: 0px, 20px;
  }

  .inputNewContentsDiscription {
    height: 50px;
    width: 125px;
    margin-bottom: 20px;
    font-size: 20px;
  }

  ul {
    display: list-item;
    list-style-type: none;
  }

  .errorMessage {
    color: red;
  }

  .todoList {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 40px;
  }

  .toDoing, .toDone {
    float: right;
    margin-left:auto;
    color: green;
    border: solid 1px green;
    font-size: 25px;
  }

  li {
    margin-bottom: 10px;
  }

  .todoTitle {
    font-size: 25px;
  }

  .todoDeleteButton, .doingDeleteButton, .doneDeleteButton {
    font-size: 25px;
    color:red;
    margin-right: 10px;
  }

  .highPriority {
    margin-top: 10px;
    margin-left: auto;
    font-size: 15px;
    color: red;
  }
  .mediumPriority {
    margin-top: 10px;
    margin-left: auto;
    font-size: 15px;
    color: green;
  }
  .lowPriority {
    margin-top: 10px;
    margin-left: auto;
    font-size: 15px;
    color: blue;
  }
</style>
