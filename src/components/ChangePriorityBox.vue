<template>
  <div class="selectBox">
    <div v-if="!isOpen" class="dropDownButton" @click="reselect">
      {{ NowPriority }}
    </div>
    <div v-else class="dropDownItems">
      <ul>
        <li @click="select('HIGH')">HIGH</li>
        <li @click="select('MEDIUM')">MEDIUM</li>
        <li @click="select('LOW')">LOW</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SelectBox extends Vue {

  @Prop()
  nowPriority!: 'HIGH' | 'MEDIUM' | 'LOW'

  isOpen =  false;

  select(priority: 'HIGH' | 'MEDIUM' | 'LOW') {
    this.isOpen = false
    this.$emit('change', priority)
  }

  reselect() {
    this.isOpen = true
  }

  get NowPriority() {
    return this.nowPriority
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
