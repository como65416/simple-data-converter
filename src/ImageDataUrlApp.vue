<template>
  <div>
    <h3>Image Data Url Convert</h3>
    <p>
      <button class="ui teal small button" v-on:click="loadImage">Load Image</button>
      <button class="ui teal small button" v-on:click="saveImage">Save Image</button>
    </p>
    <textarea v-model="image_data" style="width:100%;height:250px;"></textarea>
    <img v-bind:src="image_data"/>
  </div>
</template>

<script>
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/webpack-resolver';
import 'semantic-ui-button/button.min.css';

// const dialog = remote.dialog;

export default {
  data () {
    return {
      image_data: null
    };
  },
  methods : {
    loadImage: function () {
      const input = document.createElement('input');
      input.type = 'file';
      input.click();

      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file)
        reader.onload = (readerEvent) => {
          this.image_data = readerEvent.target.result;
        }
      }
    },
    saveImage: function () {
      if (this.image_data == null || this.image_data == '') {
        return;
      }

      const image_type = this.image_data.match(/data:image\/([a-z]+)/)[1];
      const a = document.createElement("a");
      a.href = this.image_data
      a.download = "Image." + image_type;
      a.click();
    }
  }
}
</script>
