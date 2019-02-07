<template lang="html">
  <div
    class="calendar-years-picker"
    @scroll.passive="onScroll"
    @keydown.up.stop.prevent="prevGroup"
    @keydown.down.stop.prevent="nextGroup"
    @keyup.esc="close"
    tabindex="0"
  >
    <div class="calendar-year" v-for="(y, index) in years" :key="index" @click="onSelect(date.clone().year(y))" :class="{
      'calendar-year__current': current === y,
      'calendar-year__selected': selected === y,
      'calendar-year__cursor': cursor === y,
      'calendar-year__disabled': false,
    }">
      <span v-text="y"></span>
    </div>
  </div>
</template>

<script>
import PickerMixin from "../mixins/PickerMixin"
export default {
  name: 'CalendarYearPicker',
  mixins: [PickerMixin],
  props: {
    date: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      current: this.$moment().year(),
      cursor: this.date.year()
    }
  },
  methods: {
    prevGroup () {
      this.cursor -= 10
    },
    nextGroup () {
      this.cursor += 10
    },
    next () {
      this.cursor += 1
    },
    prev () {
      this.cursor -= 1
    }
  },
  computed: {
    firstYear () {
      return 10 * Math.floor(this.cursor / 10)
    },
    selected() {
      return this.date.year()
    },
    years () {
      return Array(10).fill(0).map((_, i) => this.firstYear + i)
    }
  }
}
</script>
