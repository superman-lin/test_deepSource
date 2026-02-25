<template>
  <div class="unsafe-html">
    <h2>3. 使用 v-html 渲染用户输入（XSS 风险）</h2>
    <input v-model="userInput" placeholder="输入内容" />
    <!-- 错误：未过滤的用户输入用 v-html 渲染，存在 XSS -->
    <div v-html="userInput"></div>
  </div>
</template>

<script>
export default {
  name: 'UnsafeHtmlDemo',
  data() {
    return {
      userInput: ''
    }
  }
}
</script>
