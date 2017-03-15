<template>
  <div class="columns">
    <div class="column is-half">
      <div class="control is-horizontal">
        <div class="control-label">
          <label for="search" class="label">Search</label>
        </div>
        <div class="control">
          <quest-search id="search" @input="updateQuest"/>
        </div>
      </div>
      <h3 class="title">
        Selected Quest
      </h3>
      <quest :slug="slug" @nav="x => { selected = x }"/>
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
  },
  methods: {
    updateQuest (slug) {
      this.$router.push({
        name: 'Quest',
        params: { slug }
      })
    }
  }
}
</script>
