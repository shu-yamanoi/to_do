<template>
  <div>
    <div class="todoHeader">
      {{ todoHeader }}
    </div>
    <ul>
      <li v-for="todoItem in todoItems" :key="todoItem.id">
        <div class="todoList">
          <div class="todoDeleteButton" @click="deleteTodoHandle(todoItem.status, todoItem.id)">
            ×
          </div>
          <div class="todoTitle">
            <editTitleForm :value="todoItem.title" @input="updateTitle($event, todoItem.id)" />
          </div>
          <div class="prioritySelect">
            <SelectBox :priority="todoItem.priority" :isSelected=true @reselect="reselect($event)" @select="select($event, todoItem.id)" />
          </div>
          <div v-if="!isOpen" class="toNext" @click="toNextStatusHandle(todoItem.status, todoItem.id)">
            →
          </div>
        </div>
      </li>
    </ul>
    <slot />
  </div>
</template>
<script lang="ts">
import{ Component, Vue, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import AddTodo from './AddTodo.vue'
import { Todo } from '../store/types'
import EditTitleForm from './EditTitleForm.vue'
import SelectBox from './SelectBox.vue'

@Component({

  components: {
    AddTodo,
    EditTitleForm,
    SelectBox
  },
  
  computed: {
    ...mapState(['todos'])
  }
})
export default class TodoList extends Vue {
  @Prop()
  status!: 'TODO' | 'DOING' | 'DONE'

  isOpen = false


  toNextStatusHandle(status: 'TODO' | 'DOING', id: number) {
    this.$store.dispatch('toNextStatus', {
      status: status,
      id: id
    })
  }

  deleteTodoHandle(status: 'TODO' | 'DOING' | 'DONE', id: number) {
    this.$store.dispatch('delete', {
      id: id,
      status: status
    })
  }

  updateTitle(title: string, id: number) {
    this.$store.dispatch('update', {
      title: title,
      id: id
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

  reselect(isOpen: boolean) {
    this.isOpen = isOpen
  }

  select(event: any, id: number) {
    this.$store.dispatch('update', {
      id: id,
      priority: event.priority
    })
    this.isOpen = event.isOpen
  }

  get todoHeader() {
    switch (this.status) {
      case('DOING'):
        return 'doing'
      case('DONE'):
        return 'done'
      default:
        return 'to do'
    }
  }

  get todoItems() {
    switch (this.status) {
      case('DOING'):
        return this.$store.state.todos.filter((todo: Todo) => todo.status === 'DOING') 
      case('DONE'):
        return this.$store.state.todos.filter((todo: Todo) => todo.status === 'DONE')
      default:
        return this.$store.state.todos.filter((todo: Todo) => todo.status === 'TODO')
    }
  }
}
</script>
<style>
  .todoHeader {
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

  .toNext {
    float: right;
    margin-bottom: 30px;
    margin-left: auto;
    color: green;
    font-size: 25px;
  }

  li {
    margin-bottom: 10px;
  }

  .todoTitle {
    font-size: 25px;
  }

  .todoDeleteButton {
    font-size: 25px;
    color:red;
    margin-right: 10px;
  }

  .prioritySelect {
    height: 40px;
    margin-bottom: 20px;
  }
</style>
