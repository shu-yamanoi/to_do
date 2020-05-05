<template>
  <div class="selectBox">
    <div v-if="!isOpen && !isSelected" class="dropDownButton" @click="open">
      優先度を選択
    </div>
    <div v-else-if="!isOpen && nowIsSelected" :class="priorityClass(priority)" @click="reselect">
      {{ nowPriority }}
    </div>
    <ul v-else-if="isOpen && !nowIsSelected" class="dropDownItems">
        <li @click="select('HIGH')">HIGH</li>
        <li @click="select('MEDIUM')">MEDIUM</li>
        <li @click="select('LOW')">LOW</li>
    </ul>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue {
  @Prop()
  priority!: 'HIGH' | 'MEDIUM' | 'LOW'
  @Prop()
  isSelected!: boolean
  

  isOpen =  false;
  nowIsSelected = false;
  nowPriority = ''

  open() {
    this.isOpen = true
    this.$emit('open', this.isOpen)
  }

  select(priority: 'HIGH' | 'MEDIUM' | 'LOW') {
    this.nowPriority = priority
    this.isOpen = false
    this.nowIsSelected = true
    this.$emit('select', {
      priority: priority,
      isOpen: this.isOpen,
    })
  }

  clear() {
    this.isOpen = false
    this.nowIsSelected = false
  }

  reselect() {
    this.isOpen = true
    this.nowIsSelected = false
    this.$emit('reselect', this.isOpen)
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
  created() {
    this.nowPriority = this.priority
    this.nowIsSelected = this.isSelected
  }
}
</script>
<style>
  .dropDownButton {
    border: 1px solid grey;
    width: 150px;
    height: 30px;
    font-size: 20px;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    color: grey;
  }

  ul {
    margin: 15px 0px;
    list-style: none;
    padding-right: 36px;
    font-size: 20px;
    color: grey;
  }

  .highPriority, .mediumPriority, .lowPriority {
    width: 100px;
    height: 30px;
    font-size: 20px;
    margin: 5px auto;
  }

  .highPriority {
    color: red;
  }

  .mediumPriority {
    color: green;
  }

  .lowPriority {
    color: blue;
  }
  .dropDownItems {
    width: 150px;
    height: 30px;
    font-size: 20px;
    margin: 0px auto 50px;
  }
  
  .selectBox {
    width: 150px;
    margin: 5px auto;
  }

</style>
