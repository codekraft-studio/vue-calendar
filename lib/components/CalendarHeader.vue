<template lang="html">
  <div class="calendar-header">
    <div class="calendar-header-top">
      <slot name="header-top"></slot>
    </div>

    <div class="calendar-header-body calendar-date-picker">
      <div class="calendar-arrows calendar-arrows-left">
        <span title="previous year" class="calendar-arrow calendar-prev calendar-year calendar-arrow__prev" @click="prev('year')">&lt;</span>
        <span title="previous month" class="calendar-arrow calendar-prev calendar-month calendar-arrow__prev" @click="prev('month')">&lt;</span>
      </div>

      <div class="calendar-current-date">
        <span class="calendar-month" @click="$emit('open-monthpicker')">{{ month }} </span>
        <span class="calendar-year" @click="$emit('open-yearpicker')">{{ year }}</span>
      </div>

      <div class="calendar-arrows calendar-arrows-right">
        <span title="next month" class="calendar-arrow calendar-next calendar-month calendar-arrow__next" @click="next('month')">&gt;</span>
        <span title="next year" class="calendar-arrow calendar-next calendar-year calendar-arrow__next" @click="next('year')">&gt;</span>
      </div>
    </div>

    <div class="calendar-header-bottom">
      <slot name="header-bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarHeader',
  props: {
    date: {
      type: [String, Object],
      required: false,
      default: () => this.$moment()
    }
  },
  data () {
    return {
      today: this.$moment()
    }
  },
  computed: {
    week () {
      return {
        start: this.date.clone().startOf('week').format('DD'),
        end: this.date.clone().endOf('week').format('DD')
      }
    },
    month () {
      return this.date.format('MMMM')
    },
    year () {
      return this.date.format('YYYY')
    }
  },
  methods: {
    next (unit) {
      this.$emit('update:date', this.$moment(this.date).add(1, unit))
    },
    prev (unit) {
      this.$emit('update:date', this.$moment(this.date).subtract(1, unit))
    }
  }
}
</script>
