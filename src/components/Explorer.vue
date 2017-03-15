<template>
  <div class="columns">
    <div class="column is-half">
      <p>
        <h3 class="subtitle">Search</h3>
        <quest-search v-model="search"/>
      </p>
      <p>
        <quest :slug="slug" @nav="x => { selected = x }"/>
      </p>
    </div>
    <div v-if="selected" class="column is-half">
      <quest :slug="selected" @nav="x => { selected = x }"/>
    </div>
  </div>
</template>

<script>
import Quest from './Quest'
import QuestSearch from './QuestSearch'

export default {
  props: {
    slug: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  components: {
    Quest,
    QuestSearch
  },
  data () {
    return {
      search: this.slug,
      selected: ''
    }
  }
}
</script>
