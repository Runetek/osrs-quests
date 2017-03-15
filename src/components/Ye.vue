<template>
  <explorer :slug="random"/>
</template>

<script>
import { getRandomQuest } from '@/api/quests'
import Explorer from './Explorer'

export default {
  components: {
    Explorer
  },
  data () {
    return {
      random: getRandomQuest().slug
    }
  }
}
</script>
