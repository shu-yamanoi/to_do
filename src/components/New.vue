<template>
  <div class="new">
    <input type="text" class="createTodo" placeholder="新しい項目を追加" v-model="newTodo.title">
    <div class="errorMessage">
      {{ titleErrorMsg }}
    </div>
    <SelectBox ref="selectBox" @select="selectPriority($event)" @open="open($event)" @reselect="reselect($event)" class="selectBox" v-model="newTodo.priority"  />
    <div v-if="!isOpen && !isSelected" class="errorMessage">
      {{ priorityErrorMsg }}
    </div>
    <div v-if="!isOpen" class="createTodoSubmitButton" @click="createTodoHandle">
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

  createTodoHandle(event: any) {
    this.titleErrorMsg = ''
    this.priorityErrorMsg = ''
    if(this.newTodo.title === '') {
      return this.titleErrorMsg = '入力してください'
    }
    if(this.newTodo.priority === '') {
      return this.priorityErrorMsg = '選択してください'
    }
    this.$store.dispatch('create', this.newTodo)
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
<style>
  .createTodo {
    margin-top: 30px;
    font-size: 20px;
  }

  .selectBox {
    display: flex;
    justify-content: center;
  }
</style>
