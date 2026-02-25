<template>
  <div class="mutating-props">
    <h2>2. 直接修改 props（vue/no-mutating-props）</h2>
    <p>当前值: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MutatingPropsDemo',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    increment() {
      // 错误：直接修改 prop，违反单向数据流
      this.count += 1
    }
  }
}
</script>
