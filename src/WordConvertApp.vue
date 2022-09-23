<template>
  <div style="height:100%;">
    <h3>Word Convert</h3>
    <div class="ui form">
      <div class="inline fields">
        <div class="three wide field">
          <label>Input:</label>
          <input type="text" v-model="word">
        </div>
      </div>
      <p>
        複數名詞： {{ pluralizeWord }}
        <button class="mini teal ui icon button" @click="copyToClip(pluralizeWord)">Copy</button>
      </p>
      <p>
        PascalCase： {{ pascalCase }}
        <button class="mini teal ui icon button" @click="copyToClip(pascalCase)">Copy</button>
      </p>
      <p>
        camelCase： {{ camelCase }}
        <button class="mini teal ui icon button" @click="copyToClip(camelCase)">Copy</button>
      </p>
      <p>
        snake_case： {{ snakeCase }}
        <button class="mini teal ui icon button" @click="copyToClip(snakeCase)">Copy</button>
      </p>
      <p>
        kebab-case： {{ kebabCase }}
        <button class="mini teal ui icon button" @click="copyToClip(kebabCase)">Copy</button>
      </p>
      <p>
        MACRO_CASE： {{ macroCase }}
        <button class="mini teal ui icon button" @click="copyToClip(macroCase)">Copy</button>
      </p>
    </div>
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
import * as _ from 'lodash';
import * as pluralize from 'pluralize';
import 'semantic-ui-button/button.min.css';

export default {
  data () {
    return {
      word: 'largest city'
    }
  },
  computed: {
    pluralizeWord: function () {
      return pluralize(this.word)
    },
    pascalCase: function () {
      return this.word.charAt(0).toUpperCase() + _.camelCase(this.word).slice(1)
    },
    camelCase: function () {
      return _.camelCase(this.word)
    },
    snakeCase: function () {
      return _.snakeCase(this.word)
    },
    kebabCase: function () {
      return _.snakeCase(this.word).replace(/_/g,'-')
    },
    macroCase: function () {
      return _.snakeCase(this.word).toUpperCase()
    },
  },
  methods: {
    copyToClip: function (text) {
      let el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  },
  mounted() {
  },
}
</script>
