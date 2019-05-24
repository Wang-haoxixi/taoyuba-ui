<template>
  <div>
    <div class="steps-content">
      <slot></slot>
    </div>
    <div class="steps-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.steps-action {
  margin-top: 24px;
  text-align: center;
}
</style>
