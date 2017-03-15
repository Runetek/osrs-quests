<template>
  <div v-if="quest" class="box" style="margin: 1rem">
    <h3 class="title">{{ quest.name }}</h3>
    <hr>
    <div class="columns">
      <div class="column" v-if="skills">
        <h3 class="subtitle is-4">Skills</h3>
        <li v-for="(level, skill) in skills">
          {{ title(skill) }}: {{ level }}
        </li>
      </div>
      <div class="column" v-if="minSkills">
        <h3 class="subtitle is-4">Minimum Skills</h3>
        <li v-for="(level, skill) in minSkills">
          {{ title(skill) }}: {{ level }}
        </li>
      </div>
      <div class="column" v-if="preReqs.length > 0">
        <h3 class="subtitle is-4">Pre-Requisites</h3>
        <li v-for="preReq in preReqs">
          <router-link :to="{ name: 'Quest', params: { slug: preReq.slug } }">
            {{ preReq.name }}
          </router-link>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { each, isEmpty, upperFirst } from 'lodash'

import { getGraph, getBySlug } from '@/api/quests'

export default {
  name: 'Quest',
  props: {
    slug: String
  },
  data () {
    return {
      quest: null,
      g: null
    }
  },
  computed: {
    preReqs () {
      if (!this.quest) {
        return []
      }

      return this.quest.reqs.quests
        .map(getBySlug)
    },
    minSkills () {
      if (!this.quest) {
        return {}
      }

      const seen = new Set()
      seen.add(this.slug)

      let reqs = this.quest.reqs.skills || {}
      let queue = [...this.quest.reqs.quests.map(getBySlug)]
      while (queue.length > 0) {
        const q = queue.pop()
        each(q.reqs.skills, (level, skill) => {
          reqs[skill] = Math.max(reqs[skill] || 0, level)
        })

        queue = [
          ...queue,
          ...q.reqs.quests
            .filter(q => seen.has(q))
            .map(getBySlug)
        ]
      }

      return isEmpty(reqs) ? false : reqs
    },
    skills () {
      const reqs = this.quest.reqs.skills || {}
      return isEmpty(reqs) ? false : reqs
    }
  },
  methods: {
    fetch () {
      this.quest = getBySlug(this.slug)
      this.g = getGraph(this.slug)
    },
    title (s) {
      return upperFirst(s)
    }
  },
  mounted () {
    this.fetch()
  },
  watch: {
    slug () {
      this.fetch()
    },
    '$route' () {
      this.fetch()
    }
  }
}
</script>