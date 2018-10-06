<template>
  <div>
    <h3>Timestamp Date Convert</h3>
    <div style="margin: 15px 0 15px 0;">
      <el-input placeholder="Please input" v-model="input_value" class="input-with-select">
        <el-select v-model="input_type" slot="prepend" placeholder="Select">
          <el-option label="Timestamp" value="timestamp"></el-option>
          <el-option label="Date Time" value="datatime"></el-option>
        </el-select>
      </el-input>
    </div>
    <el-select v-model="gmt" slot="prepend" placeholder="Select">
      <el-option v-bind:label="'GMT+' + (index - 1)" v-bind:value="index - 1" v-for="index in 24" :key="index"></el-option>
    </el-select>
    <el-card shadow="always" style="margin: 15px 0 15px 0;">
      Timestamp : {{ time_value }} <br /><br />
      Date : {{ output_date }}
    </el-card>
  </div>
</template>

<style>
  .el-select .el-input {
    width: 140px;
  }
</style>

<script>
export default {
  data() {
    let now_time = parseInt(new Date().getTime() / 1000);
    return {
      input_value: now_time,
      input_type: 'timestamp',
      time_value: now_time,
      gmt: -(new Date().getTimezoneOffset() / 60)
    }
  },
  watch: {
    input_value: function (val) {
      if (this.input_type == 'timestamp') {
        if (this.input_value.match(/^[0-9]+$/)) {
          this.time_value = parseInt(this.input_value);
        }
      } else if (this.input_type == 'datatime') {
        let d = new Date(this.input_value);
        if (!isNaN(d.getTime())) {
          this.time_value = parseInt(d.getTime() / 1000);
        }
      }
    },
    input_type: function () {
      if (this.input_type == 'timestamp') {
        this.input_value = this.time_value + "";
      } else if (this.input_type == 'datatime') {
        let d = new Date(this.time_value * 1000);
        this.input_value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      }
    }
  },
  computed: {
    output_date() {
      let weekday = [];
      weekday[0] = "Monday";
      weekday[1] = "Tuesday";
      weekday[2] = "Wednesday";
      weekday[3] = "Thursday";
      weekday[4] = "Friday";
      weekday[5] = "Saturday";
      weekday[6] = "Sunday";
      let system_gmt = - (new Date().getTimezoneOffset() / 60);
      let d = new Date((this.time_value + (this.gmt - system_gmt) * 3600) * 1000);

      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " (" + weekday[d.getDay()] + ")";
    }
  }
}
</script>