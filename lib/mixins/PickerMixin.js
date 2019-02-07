export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit("update:visible", false)
    },
    onSelect (date) {
      this.$emit("select", date)
      this.close()
    }
  },
  mounted () {
    this.$el.focus()
  }
}
