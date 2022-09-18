<template>
  <div style="height:100%;">
    <h3>簡體繁體轉換工具 (OpenCC)</h3>
    <div id="editor"></div>
    <center>
      <button class="ui teal small button" v-on:click="chsToCht">簡轉繁</button>
      <button class="ui teal small button" v-on:click="chtToChs">繁轉簡</button>
    </center>
  </div>
</template>

<style scoped>
    #editor {
      font-size:14px;
      width: 100%;
      height: 450px;
    }

    .button_list {
      text-algin:center;
    }
</style>

<script>
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/webpack-resolver';
import * as OpenCC from 'opencc-js';
import 'semantic-ui-button/button.min.css';

export default {
  data () {
    return {
      editor: null
    };
  },
  mounted() {
    var editor = ace.edit("editor");
    editor.setValue("簡體繁體轉換工具");
    editor.setTheme("ace/theme/monokai");
    editor.container.style.lineHeight = 1.3;
    this.editor = editor;
  },
  methods: {
    chtToChs: function () {
      const converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
      this.editor.setValue(converter(this.editor.getValue()));
    },
    chsToCht: function () {
      const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
      this.editor.setValue(converter(this.editor.getValue()));
    }
  }
}
</script>
