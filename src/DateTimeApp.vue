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
    <el-button plain type="primary" @click="setToNowTime()">Now Time</el-button>
    <el-button-group>
      <el-button plain type="warning" @click="subtime('hour')">- 1 Hour</el-button>
      <el-button plain type="success" @click="addtime('hour')">+ 1 Hour</el-button>
    </el-button-group>
    <el-button-group>
      <el-button plain type="warning" @click="subtime('day')">- 1 Day</el-button>
      <el-button plain type="success" @click="addtime('day')">+ 1 Day</el-button>
    </el-button-group>
    <el-button-group>
      <el-button plain type="warning" @click="subtime('month')">- 1 Month</el-button>
      <el-button plain type="success" @click="addtime('month')">+ 1 Month</el-button>
    </el-button-group>
    <el-button-group>
      <el-button plain type="warning" @click="subtime('year')">- 1 Year</el-button>
      <el-button plain type="success" @click="addtime('year')">+ 1 Year</el-button>
    </el-button-group>
    <br><br>
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
  methods: {
    setToNowTime: function() {
      let newDate = new Date();
      if (this.input_type == 'timestamp') {
        this.input_value = parseInt(newDate.getTime() / 1000).toString();
      } else {
        this.input_value = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
      }
    },
    addtime: function(unit) {
      let d = (this.input_type == 'timestamp') ? new Date(this.input_value * 1000) : new Date(this.input_value);
      let year = d.getFullYear();
      let month = d.getMonth();
      let day = d.getDate();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      let newDate = null;
      if (unit == 'hour') {
        newDate = new Date(year, month, day, hours + 1, minutes, seconds);
      } else if (unit == 'day') {
        newDate = new Date(year, month, day + 1, hours, minutes, seconds);
      } else if (unit == 'month') {
        newDate = new Date(year, month + 1, day, hours, minutes, seconds);
      } else if (unit == 'year') {
        newDate = new Date(year + 1, month, day, hours, minutes, seconds);
      }

      if (this.input_type == 'timestamp') {
        this.input_value = (newDate.getTime() / 1000).toString();
      } else {
        this.input_value = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
      }
    },
    subtime: function(unit) {
      let d = (this.input_type == 'timestamp') ? new Date(this.input_value * 1000) : new Date(this.input_value);
      let year = d.getFullYear();
      let month = d.getMonth();
      let day = d.getDate();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();

      let newDate = null;
      if (unit == 'hour') {
        newDate = new Date(year, month, day, hours - 1, minutes, seconds);
      } else if (unit == 'day') {
        newDate = new Date(year, month, day - 1, hours, minutes, seconds);
      } else if (unit == 'month') {
        newDate = new Date(year, month - 1, day, hours, minutes, seconds);
      } else if (unit == 'year') {
        newDate = new Date(year - 1, month, day, hours, minutes, seconds);
      }

      if (this.input_type == 'timestamp') {
        this.input_value = (newDate.getTime() / 1000).toString();
      } else {
        this.input_value = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
      }
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
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      let system_gmt = - (new Date().getTimezoneOffset() / 60);
      let d = new Date((this.time_value + (this.gmt - system_gmt) * 3600) * 1000);

      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " (" + weekday[d.getDay()] + ")";
    }
  }
}
</script>