<template>
  <div id="app">
    <h1>DeepSource JS 分析器验证 Demo</h1>
    <BuggyList :items="listItems" />
    <MutatingPropsDemo :count="count" />
    <UnsafeHtmlDemo />
    <DeprecatedApiDemo />
  </div>
</template>

<script>
import BuggyList from './components/BuggyList.vue'
import MutatingPropsDemo from './components/MutatingPropsDemo.vue'
import UnsafeHtmlDemo from './components/UnsafeHtmlDemo.vue'
import DeprecatedApiDemo from './components/DeprecatedApiDemo.vue'

export default {
  name: 'App',
  components: {
    BuggyList,
    MutatingPropsDemo,
    UnsafeHtmlDemo,
    DeprecatedApiDemo
  },
  data() {
    return {
      listItems: [
        { id: 1, name: '项目 A' },
        { id: 2, name: '项目 B' },
        { id: 3, name: '项目 C' }
      ],
      count: 0
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}
</style>
