<template>
  <div class="home">
    <div v-for="(status, index) in statuses" :key="index" class="todo-table">
      <TodoList :status="status">
        <div v-if="status ==='TODO'" class="add-todo">
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

  created() {
    this.$store.dispatch('doSetState')
  }
}

</script>
<style scoped>

  .home {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-right: 50px;
    height: 100%;
  }

  .todo-table {
    margin: 0px 60px;
    height: 100vh;
    padding: 0px, 20px;
    width: 300px;
  }


  .add-todo {
    margin: 60px 0px;
  }
</style>
