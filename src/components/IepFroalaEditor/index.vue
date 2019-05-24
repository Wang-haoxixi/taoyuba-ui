<template>
  <div id="app" class="app">
    <froala :tag="'textarea'" :config="froalaConfig" v-model="froalaContent"></froala>
  </div>
</template>

<script>
// import VueFroala from 'vue-froala-wysiwyg'
import store from '@/store'
export default {
  name: 'IepFroalaEditor',
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '请填写内容',
    },
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      //More -> https://www.froala.com/wysiwyg-editor/docs/options
      froalaConfig: {
        paragraphStyles: {
          'iep-froala-indent': '首行缩进',
        },
        height: '300',
        fontSize: ['12', '14', '18', '24', '30', '36', '48', '60', '72', '96'],
        toolbarButtons: ['undo', 'redo', 'selectAll', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'paragraphStyle', '|', 'insertLink', 'insertImage', 'insertFile', 'embedly', 'insertTable', '|', 'insertHR', 'clearFormatting', '|', 'print', 'spellChecker', '|', 'fullscreen'],//['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],//显示可操作项
        theme: 'gray',//主题
        placeholderText: this.placeholder,
        language: 'zh_cn',//国际化
        imageUploadURL: '/api/admin/file/wysiwyg/upload',//上传url
        fileUploadURL: '/api/admin/file/wysiwyg/upload',//上传url 更多上传介绍 请访问https://www.froala.com/wysiwyg-editor/docs/options
        quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr'],//快速插入项
        toolbarVisibleWithoutSelection: false,//是否开启 不选中模式
        // disableRightClick: true,//是否屏蔽右击
        imageDefaultWidth: 500,
        colorsHEXInput: false,//关闭16进制色值
        toolbarSticky: false,//操作栏是否自动吸顶
        zIndex: 500,
        requestHeaders: { Authorization: 'Bearer ' + store.getters.access_token },
        events: {
          'froalaEditor.initialized': function () {
          },
        },
      },
    }
  },
  computed: {
    froalaContent: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
<style lang="scss" scoped>
.app {
  padding: 1px !important;
  // border: 1px solid #dcdfe6;
}
</style>

<style scoped>
.app >>> .fr-wrapper > div[style*="z-index: 9999"] {
  /*position: absolute;
    top: -10000px;
    opacity: 0;*/
  display: none;
}
.app >>> .fr-placeholder {
  margin-top: 0 !important;
}
</style>
