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
import * as ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/webpack-resolver';
import 'semantic-ui-button/button.min.css';
import fs from "fs";
import {remote} from 'electron';
import readChunk from 'read-chunk';
import imageType from 'image-type';

const dialog = remote.dialog;

export default {
  data () {
    return {
      image_data: null
    };
  },
  methods : {
    loadImage: function () {
      var self = this;
      dialog.showOpenDialog({
          properties: ['openFile']
      }, function (files) {
          if (files !== undefined) {
              let image_path = files[0];
              let buffer = readChunk.sync(image_path, 0, 12);
              let image_type = imageType(buffer);

              let bitmap = fs.readFileSync(image_path);
              let image_data_url = "data:" + image_type.mime + ";base64," + new Buffer(bitmap).toString('base64');
              self.image_data = image_data_url;
          }
      });
    },
    saveImage: function () {
      if (this.image_data == null || this.image_data == '') {
        return;
      }

      var self = this;
      let image_type = this.image_data.match(/data:image\/([a-z]+)/)[1];
      dialog.showSaveDialog({
        title: 'Save Image',
        defaultPath: 'image.' + image_type
      }, function(result) {
        if (result != null) {
          let image_data = self.image_data.replace(/data:image(\/)[a-z]+;base64,/, '');
          fs.writeFile(result, image_data, 'base64', function(err) {
            console.log(err);
          });
        }
      });
    }
  }
}
</script>