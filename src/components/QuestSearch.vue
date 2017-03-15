<template>
  <select class="input select">
    <slot></slot>
  </select>
</template>

<script>
import { Quests } from '@/api/quests'

const $ = require('jquery')

export default {
  props: ['value'],
  mounted () {
    const $vm = this
    $(this.$el)
      .val(this.value)
      .select2({
        data: Quests.value().map(q => ({ id: q.slug, text: q.name }))
      })
      .on('change', function () {
        $vm.$emit('input', this.value)
      })
  },
  watch: {
    value (value) {
      console.log(value)
      $(this.$el).val(value)
    }
  },
  destroyed () {
    $(this.$el).off().select2('destroy')
  }
}
</script>
