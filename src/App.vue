<template>
  <div id="app">
    <section id="simple">
      <h1>Simple calendar</h1>
      <p>The basic calendar use without events or fancy stuff</p>
      <div class="container">
        <VueCalendar ref="Calendar" @date-change="($event) => lastEvent = $event" />
        <div class="panel">
          <h3>Last date change event</h3>
          <pre v-text="lastEvent"></pre>
        </div>
      </div>
    </section>

    <section id="advanced">
      <h1>Advanced calendar</h1>
      <p>The calendar with all his options activated</p>
      <div class="container">
        <VueCalendar
          ref="Calendar"
          :entries="events"
          @date-change="onDateChange"
          @day-click="onDayClick"
          :options="advancedCalendarOptions"
        >
          <div slot="header-top" slot-scope="slotProps" class="my-calendar-header"></div>
        </VueCalendar>

        <div class="panel">
          <button class="button" @click="prev('year')">PREV YEAR</button>
          <button class="button" @click="prev('month')">PREV MONTH</button>
          <button class="button" @click="prev('day')">PREV DAY</button>

          <button class="button" @click="next('day')">NEXT DAY</button>
          <button class="button" @click="next('month')">NEXT MONTH</button>
          <button class="button" @click="next('year')">NEXT YEAR</button>

          <div class="">
            <p>
              <input id="show-header" type="checkbox" v-model="advancedCalendarOptions.header"><label for="show-header">Show header</label>
            </p>
            <p>
              <input id="show-months" type="checkbox" v-model="advancedCalendarOptions.labels.months"><label for="show-months">Show months labels</label>
            </p>
            <p>
              <input id="show-days" type="checkbox" v-model="advancedCalendarOptions.labels.days"><label for="show-days">Show days labels</label>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      locale: "it",

      newEvent: {
        title: "",
        startDate: "",
        endDate: ""
      },

      lastEvent: null,

      advancedCalendarOptions: {
        header: true,
        labels: {
          months: true,
          days: true
        }
      },

      currentDay: null,
      events: []
    }
  },
  methods: {
    next (unit) {
      this.$refs.Calendar.next(unit)
    },
    prev (unit) {
      this.$refs.Calendar.prev(unit)
    },
    resetEvent () {
      this.newEvent = {
        title: "",
        startDate: "",
        endDate: ""
      }
    },
    addEvent () {
      const event = this.newEvent;
      this.resetEvent();
      this.events.push(event)
    },
    onDayClick (day) {
      console.log("Day clicked:", day);
      this.currentDay = day
    },
    onDateChange (event) {
      console.log("Date changed:", event);
      this.lastEvent = event
    }
  }
}
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #EEEEEE;
}

#app {
  section {
    max-width: 1000px;
    margin: 0 auto 50px;
    .container {
      display: flex;
      .vue-calendar {
        margin-right: 25px;
      }
      .panel {
        max-width: 320px;
        min-width: 320px;
        padding: 16px 24px;
        background-color: #fff;
        border: thin solid #eee;
        flex: 1 100%;
        pre {
          margin: 16px 0 0;
          padding: 0;
        }
      }
    }
  }
}

#advanced {
  .my-calendar-header {
    height: 250px;
    background-color: gray;
    background-image: url(https://png.pngtree.com/element_origin_min_pic/16/09/03/1757ca9cbc43d7e.jpg);
    background-repeat: no-repeat;
    background-size: auto;
    width: 100%;
  }
}
</style>
