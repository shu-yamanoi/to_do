<template>
  <div>
    <input type="text" class="create-todo" placeholder="新しい項目を追加" v-model="newTodo.title" maxlength='20'>
    <div class="error-message">
      {{ titleErrorMsg }}
    </div>
    <SelectBox ref="selectBox" @select="selectPriority($event)" @open="open($event)" @reselect="reselect($event)" class="select-box" v-model="newTodo.priority" :isSelected="isSelected" :priority="newTodo.priority"  />
    <div v-if="!isOpen && !isSelected" class="error-message">
      {{ priorityErrorMsg }}
    </div>
    <div v-if="!isOpen" class="create-todo-submit-button" @click="createTodoHandle">
      追加
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectBox from './SelectBox.vue'

@Component({

  components: {
    SelectBox
  },

  computed: {
    
  }
})
export default class Home extends Vue {

  titleErrorMsg = ''
  priorityErrorMsg = ''
  newTodo = {
    title: '',
    priority: ''
  }
  isOpen = false;
  isSelected = false;

  $refs!: {
    selectBox: Vue;
  }
  get refs(): any {
    return this.$refs
  }

  createTodoHandle() {
    this.titleErrorMsg = ''
    this.priorityErrorMsg = ''
    if(this.newTodo.title === '') {
      return this.titleErrorMsg = '入力してください'
    }
    if(this.newTodo.priority === '') {
      return this.priorityErrorMsg = '選択してください'
    }
    this.$store.dispatch('add', this.newTodo)
    this.newTodo.title = ''
    this.newTodo.priority = ''
    this.refs.selectBox.clear()
    this.isSelected = false
  }

  selectPriority(event: any) {
    const priority = event.priority as 'HIGH' | 'MEDIUM' | 'LOW'
    this.isOpen = event.isOpen
    this.isSelected = true
    this.newTodo.priority = priority
  }

  open(isOpen: boolean) {
    this.isOpen = isOpen
  }

  reselect(isOpen: boolean) {
    this.isOpen = isOpen
  }
}
</script>
<style scoped>
  .create-todo {
    margin-top: 30px;
    font-size: 20px;
  }

  .select-box {
    display: flex;
    justify-content: center;
  }
  .error-message {
    margin: 10px 0px;
  }
  .create-todo-submit-button {
    margin: 30px 0px;
    cursor: pointer;
  }
</style>
