<template>
  <div class="Home">
    <div class="todoTable">
      <div class="todoHeader">
        to do
      </div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <div class="todoList">
            <div class="todoDeleteButton" @click="deleteTodoHandle(todo.state, todo.id)">
              ×
            </div>
            <div class="todoTitle">
              {{ todo.title }}
            </div>
            <div :class="priorityClass(todo.priority)">
              {{ todo.priority }}
            </div>
            <div class="toDoing" @click="toNextState(todo.state, todo.id)">
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
        <li v-for="doing in doings" :key="doing.id">
          <div class="todoList">
            <div class="doingDeleteButton" @click="deleteTodoHandle(doing.state, doing.id)">
              ×
            </div>
            <div class="todoTitle">
              {{ doing.title }}
            </div>
            <div :class="priorityClass(doing.priority)">
              {{ doing.priority }}
            </div>
            <div class="toDone" @click="toNextState(doing.state, doing.id)">
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
        <li v-for="done in dones" :key="done.id">
          <div class="todoList">
            <div class="doneDeleteButton" @click="deleteTodoHandle(done.state, done.id)">
              ×
            </div>
            <div class="todoTitle">
            {{ done.title }}
            </div>
            <div :class="priorityClass(done.priority)">
              {{ done.priority }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import New from './New.vue'

@Component({

  components: {
    New
  },

  computed: {
    ...mapState(["todos","doings","dones"])
  },

})
export default class Home extends Vue {

  toNextState(state: 'TODO' | 'DOING', id: number) {
    this.$store.dispatch('ToNextState', {
      state: state,
      id: id
    })
  }

  deleteTodoHandle(state: 'TODO' | 'DOING' | 'DONE', id: number) {
    this.$store.dispatch('DeleteTodo', {
      id: id,
      state: state
    })
  }

  priorityClass(priority: 'HIGH' | 'MEDIUM' | 'LOW'): string {
    if(priority === 'HIGH') {
      return 'highPriority'
    }else if(priority === 'MEDIUM') {
      return 'mediumPriority'
    }else {
      return 'lowPriority'
    }
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
