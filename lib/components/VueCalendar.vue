<template lang="html">
  <div class="vue-calendar">
    <div class="calendar-container">
      <div v-if="computedOptions.header" class="calendar-header-container">
        <slot name="header">
          <CalendarHeader
            :options="computedOptions.header"
            @open-monthpicker="openMonthpicker"
            @open-yearpicker="openYearpicker"
            :date.sync="currentDate"
            v-bind="{$slots, $scopedSlots}"
          />
        </slot>
      </div>

      <div class="calendar-body">
        <div class="calendar-labels">
          <CalendarMonths v-if="computedOptions.labels.months" :locale="locale" :date="currentDate" @select="setDate" />
          <CalendarDays v-if="computedOptions.labels.days" :locale="locale" />
        </div>

        <CalendarGrid :date="currentDate" :events="entries" />
      </div>

      <div v-if="computedOptions.footer" class="calendar-footer-container">
        <slot name="footer">
          <CalendarFooter :options="computedOptions.footer" v-bind="{$slots, $scopedSlots}" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import mergeWith from 'lodash.mergewith'

// Layout
import CalendarHeader from './CalendarHeader'
import CalendarFooter from './CalendarFooter'

// Labels
import CalendarDays from './CalendarDays'
import CalendarMonths from './CalendarMonths'

// Grid
import CalendarGrid from "./CalendarGrid"

// Default calendar settings and configuration
import defaultOptions from '../config'

// If user entered true but the original option
// takes an object use the default values instead
function customizer(objVal, srcVal) {
  if (srcVal === true && typeof objVal === 'object') {
    return objVal
  }
  return srcVal;
}

export default {
  name: 'VueCalendar',
  components: {
    CalendarHeader,
    CalendarFooter,
    CalendarGrid,
    CalendarDays,
    CalendarMonths
  },
  props: {
    locale: {
      type: String,
      default: () => window.navigator.language
    },
    entries: {
      type: Array,
      required: false,
      default: () => []
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    options: {
      type: Object,
      required: false,
      default: () => defaultOptions
    }
  },
  data () {
    return {
      today: this.$moment(),
      currentDate: this.$moment(),

      showMonthpicker: false,
      showYearpicker: false,

      selectedDays: [],
      months: this.$moment.monthsShort()
    }
  },
  provide () {
    return {
      calendar: this
    }
  },
  methods: {
    next (unit, len = 1) {
      this.currentDate = this.$moment(this.currentDate).add(len, unit)
    },
    prev (unit, len = 1) {
      this.currentDate = this.$moment(this.currentDate).subtract(len, unit)
    },
    setDate (date, format) {
      this.currentDate = this.$moment(date, format)
    },
    openMonthpicker () {
      this.showMonthpicker = true
    },
    openYearpicker () {
      this.showYearpicker = true
    },
    onDayClick (day) {
      this.$emit('day-click', day)
    }
  },
  computed: {
    computedOptions () {
      return mergeWith({}, defaultOptions, this.options, customizer)
    },
    eventObject () {
      const date = this.currentDate.clone().startOf('day')
      return {
        currentDate: date.toISOString(),
        day: {
          name: date.format('dddd'),
          nameShort: date.format('ddd'),
          ofWeek: date.weekday(),
          ofWeekISO: date.isoWeekday(),
          ofMonth: date.date(),
          ofYear: date.dayOfYear()
        },
        month: {
          name: date.format('MMMM'),
          nameShort: date.format('MMM'),
          number: date.month(),
          boundaries: {
            start: date.clone().startOf('month').toISOString(),
            end: date.clone().endOf('month').endOf('day').toISOString(),
          }
        },
        year: {
          name: date.format('YYYY'),
          nameShort: date.format('YY'),
          number: date.year(),
          boundaries: {
            start: date.clone().startOf('year').toISOString(),
            end: date.clone().endOf('year').endOf('day').toISOString(),
          }
        },
      }
    }
  },
  watch: {
    currentDate () {
      this.$emit('date-change', this.eventObject)
    }
  },
  created () {
    this.$moment.locale(this.locale)
  }
}
</script>
