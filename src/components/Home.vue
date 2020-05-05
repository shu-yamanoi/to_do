<template>
  <div class="Home">
    <div v-for="(status, index) in statuses" :key="index" class="todoTable">
      <TodoList :status="status">
        <div v-if="status ==='TODO'" class="addTodo">
          <AddTodo />
        </div>
      </TodoList>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoList from './TodoList.vue'
import AddTodo from './AddTodo.vue'

@Component({

  components: {
    TodoList,
    AddTodo
  },
})
export default class Home extends Vue {
  statuses = ['TODO', 'DOING', 'DONE']
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

  .todoTable {
    margin: 0px 60px;
    height: 100vh;
    padding: 0px, 20px;
    width: 300px;
  }


  .addTodo {
    margin: 60px 0px;
  }
</style>
