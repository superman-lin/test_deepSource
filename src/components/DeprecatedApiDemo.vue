<template>
  <div class="deprecated-api">
    <h2>4. 其他 JS 问题（供 DeepSource 通用规则检测）</h2>
    <p>{{ result }}</p>
  </div>
</template>

<script>
export default {
  name: 'DeprecatedApiDemo',
  data() {
    return {
      result: ''
    }
  },
  created() {
    // 使用 == 而非 ===（eqeqeq）
    const a = 1
    if (a == '1') {
      this.result = 'loose equality'
    }
    // 未使用的变量（no-unused-vars）
    const unusedVar = 42
    // 遗留 console（no-console）
    console.log('debug', unusedVar)
    // 可能的空引用
    const obj = { foo: { bar: 1 } }
    this.result = obj.foo.bar
  }
}
</script>
