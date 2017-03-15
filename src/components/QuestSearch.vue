<template>
  <select class="input select">
    <option
      v-for="quest in quests"
      :value="quest.slug"
      v-text="quest.name"
    ></option>
  </select>
</template>

<script>
import { Quests } from '@/api/quests'

const $ = require('jquery')

export default {
  props: ['value'],
  data () {
    return {
      quests: Quests.map(x => ({
        slug: x.slug,
        name: x.name
      })).value()
    }
  },
  mounted () {
    const $vm = this
    $(this.$el)
      .val(this.value)
      .select2()
      .on('change', function () {
        $vm.$emit('input', this.value)
      })
  },
  watch: {
    value (value) {
      $(this.$el).val(value)
    }
  },
  destroyed () {
    $(this.$el).off().select2('destroy')
  }
}
</script>
