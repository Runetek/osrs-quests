<template>
  <div class="container-fluid">
    <div class="columns">
      <div class="column is-half">
        <quest-search v-model="selected"/>
      </div>
      <div class="column is-half" v-show="selected">
        <h3 class="subtitle">
          Selected Quest
        </h3>
        <quest :slug="selected"/>
      </div>
    </div>
  </div>
</template>

<script>
import Quest from './Quest'
import QuestSearch from './QuestSearch'

export default {
  components: {
    Quest,
    QuestSearch
  },
  data () {
    return {
      selected: ''
    }
  }
}
</script>
