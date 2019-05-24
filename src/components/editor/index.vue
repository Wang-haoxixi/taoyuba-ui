<template>
  <quill-editor class="quill-editor" :content="content" :options="editorOption" @blur="onEditorBlur($event);" @focus="onEditorFocus($event);" @ready="onEditorReady($event);" @change="onEditorChange($event);" :disabled="disabled">
  </quill-editor>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import hljs from 'highlight.js'
import { quillEditor } from 'vue-quill-editor'

export default {
  props: ['value', 'disabled'],
  data () {
    return {
      editorOption: {
        placeholder: '请在这里输入文本',
        modules: {
          toolbar: this.disabled
            ? false
            : [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image', 'video'],
            ],
          // import hljs from 'highlight.js'
          // syntax: {
          //   highlight: text => hljs.highlightAuto(text).value,
          // },
        },
      },
    }
  },
  computed: {
    content: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    onEditorChange ({ html }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
    },
    onEditorBlur () {
      // console.log('editor blur!', editor)
    },
    onEditorFocus () {
      // console.log('editor focus!', editor)
    },
    onEditorReady () {
      // console.log('editor ready!', editor)
    },
  },
  components: {
    quillEditor,
  },
}
</script>

<style lang="scss" scoped>
.quill-editor {
  width: 100%;
  float: left;
}
.quill-editor /deep/ .ql-container {
  height: 200px;
}
.quill-editor /deep/ .ql-picker-label::before {
  position: absolute;
}
.quill-editor /deep/ .ql-icon-picker .ql-picker-label svg {
  position: absolute;
}
.quill-editor /deep/ .ql-color-picker .ql-picker-label svg {
  position: absolute;
}
</style>
