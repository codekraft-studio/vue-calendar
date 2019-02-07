<template lang="html">
  <div class="calendar-label-days">
    <div class="ccalendar-label-dayname" v-for="(day, index) in days" :key="index" :class="{
      'ccalendar-label-dayname__current': current === index
    }">
      <span v-text="day"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarDays',
  props: {
    locale: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      current: this.$moment().day()
    }
  },
  computed: {
    days () {
      this.$moment.locale(this.locale)
      return this.$moment.weekdaysShort()
    }
  }
}
</script>
