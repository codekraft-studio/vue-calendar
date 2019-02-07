<template lang="html">
  <div class="calendar-footer">
    <div class="calendar-footer-top">
      <slot name="footer-top"></slot>
    </div>
    <div class="calendar-footer-bottom">
      <slot name="footer-bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarFooter'
}
</script>
