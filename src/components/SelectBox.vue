<template>
  <div class="selectBox">
    <div v-if="!isOpen && !isSelected" class="dropDownButton" @click="open">
      優先度を選択
    </div>
    <div v-else-if="!isOpen && isSelected" class="dropDownButton" @click="reselect">
      {{ priority }}
    </div>
    <div v-else-if="isOpen && !isSelected" class="dropDownItems">
      <ul>
        <li @click="select('HIGH')">HIGH</li>
        <li @click="select('MEDIUM')">MEDIUM</li>
        <li @click="select('LOW')">LOW</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue {


  isOpen =  false;
  isSelected = false;
  priority = ''

  open() {
    this.isOpen = true
    this.$emit('open', this.isOpen)
  }

  select(priority: 'HIGH' | 'MEDIUM' | 'LOW') {
    this.priority = priority
    this.isOpen = false
    this.isSelected = true
    this.$emit('select', {
      priority: priority,
      isOpen: this.isOpen,
    })
  }

  clear() {
    this.isOpen = false
    this.isSelected = false
  }

  reselect() {
    this.isOpen = true
    this.isSelected = false
    this.$emit('reselect', this.isOpen)
  }
}
</script>
<style>
  .dropDownButton {
    border: 1px solid grey;
    margin: 10px 0px;
    width: 160px;
    display: flex;
    justify-content: center;
    color: grey;
  }

  .dropDownItems {
    font-size:20px;
    border: 1px solid grey;
    width: 160px;
  }

  ul {
    margin: 15px 0px;
    list-style: none;
    padding-right: 36px;
    color: grey;
  }
</style>
