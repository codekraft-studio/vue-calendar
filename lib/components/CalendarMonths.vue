<template lang="html">
  <div class="calendar-label-months">
    <div
      class="calendar-label-monthname"
      v-for="(month, index) in months" :key="index"
      @click="$emit('select', date.clone().month(index))"
      :class="{
        'calendar-label-monthname__selected': current === index
      }"
    >
      <span v-text="month"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarMonths',
  props: {
    date: {
      type: Object,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: false,
      default: 'short',
      validator: v => [
        'full',
        'short',
        'min'
      ].includes(v)
    }
  },
  computed: {
    current () {
      return this.date.month()
    },
    months () {
      this.$moment.locale(this.locale)
      return this.$moment.monthsShort()
    }
  }
}
</script>
