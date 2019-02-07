<template lang="html">
  <div class="calendar-day" :class="{
    'calendar-day__active': !day.isDisabled,
    'calendar-day__disabled': day.isDisabled,
    'calendar-day__selected': day.isSelected,
    'calendar-day__prev': day.isPrevMonth,
    'calendar-day__next': day.isNextMonth,
    'calendar-day__has-events': day.events.length,
    'calendar-day__today': day.isToday
  }" @click="onClick">
    <span class="calendar-day-number">{{day.number}}</span>
    <span v-if="day.events.length" class="calendar-day-events">
      {{day.events.length}}
    </span>
  </div>
</template>

<script>
export default {
  name: "CalendarDay",
  inject: ['calendar'],
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick () {
      const dayObj = this.$moment(this.day.dateISO)
      this.calendar.$emit("day-click", {
        ...this.day,
        numberOfWeek: dayObj.weekday(),
        numberOfMonth: dayObj.date(),
        numberOfYear: dayObj.dayOfYear(),
      })
    }
  }
}
</script>
