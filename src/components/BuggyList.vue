<template>
  <div class="buggy-list">
    <h2>1. v-for 缺少 key / key 使用不当（vue/require-v-for-key, vue/no-v-for-template-key）</h2>
    <!-- 错误：v-for 没有绑定 key -->
    <ul>
      <li v-for="item in items">{{ item.name }}</li>
    </ul>
    <!-- 错误：key 放在 template 子元素上 -->
    <template v-for="item in items">
      <div :key="item.id">{{ item.name }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BuggyList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
