<template lang="html">
  <div
    class="calendar-months-picker"
    @keydown.esc="close"
    tabindex="0"
  >
    <div class="calendar-month" v-for="(m, index) in months" :key="index" @click="onSelect(date.clone().month(index))" :class="{
      'calendar-month__current': current === index,
      'calendar-month__selected': selected === index,
      'calendar-month__disabled': false,
    }">
      <span v-text="m.name"></span>
    </div>
  </div>
</template>

<script>
import PickerMixin from "../mixins/PickerMixin"
export default {
  name: 'CalendarMonthPicker',
  mixins: [PickerMixin],
  props: {
    date: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      current: this.$moment().month(),
      cursor: this.date.month()
    }
  },
  computed: {
    selected () {
      return this.date.month()
    },
    months () {
      return this.$moment.months().map((name, number) => ({
        name,
        number
      }))
    }
  }
}
</script>
