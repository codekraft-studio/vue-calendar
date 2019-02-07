<template lang="html">
  <div class="calendar-grid">
    <div class="calendar-week" v-for="(week, index) in grid" :key="'week-'+index">
      <CalendarDay v-for="(day, index) in week.days" :key="'day-'+index" :day="day" />
    </div>
  </div>
</template>

<script>
import CalendarDay from "./CalendarDay"
export default {
  name: "CalendarGrid",
  components: {
    CalendarDay
  },
  props: {
    date: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    startDay () {
      return this.date.clone().startOf('month').startOf('week')
    },
    endDay () {
      return this.date.clone().endOf('month').endOf('week')
    },
    grid () {
      const calendar = []
      const {startDay, endDay} = this

      let date = startDay.clone();
      while (date.isBefore(endDay, 'day')) {
        calendar.push({
          days: Array(7).fill(0).map(() => {
            const startOfDay = date.clone().startOf('day')
            const endOfDay = date.clone().endOf('day')
            const day = {
              name: date.format('dddd'),
              nameShort: date.format('ddd'),
              nameLong: date.format('LL'),
              nameCalendar: date.calendar(),
              number: date.date(),
              dateISO: date.format('YYYY-MM-DD'),
              isPrevYear: date.isBefore(this.date, 'year'),
              isNextYear: date.isBefore(this.date, 'year'),
              isPrevMonth: date.isBefore(this.date, 'month'),
              isNextMonth: date.isAfter(this.date, 'month'),
              isSameMonth: date.isSame(this.date, 'month'),
              isSameYear: date.isSame(this.date, 'year'),
              isDisabled: !date.isSame(this.date, 'month'),
              isToday: date.isSame(this.today, 'day'),
              isBefore: date.isBefore(this.today),
              isAfter: date.isAfter(this.today),
              events: this.events.filter(e => {
                return startOfDay.isBetween(e.startDate, e.endDate) || endOfDay.isBetween(e.startDate, e.endDate)
              })
            }
            date = date.clone().add(1, 'day')
            return day
          })
        })
      }

      return calendar
    }
  }
}
</script>

<style lang="scss">
  .calendar-hours {
    width: 100%;
    display: flex;
    .hours {
      width: 100%;
    }
    .cell {
      width: 100%;
      height: 25px;
      display: inline-block;
      &.cell__is-hour {
        border-bottom: thin solid #d2d2d2;
      }
    }
  }
</style>
