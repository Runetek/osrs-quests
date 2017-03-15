const { uniq, memoize } = require('lodash')
const { slugify } = require('lodash-addons')

// import { Graph, alg } from 'graphlib'
const gl = require('graphlib')

const { Graph } = gl

const low = require('lowdb')
const db = low()
const data = require('../data/quests.json')

const SKILL_NAMES = [
  'Overall', 'Attack', 'Defence', 'Strength', 'Hitpoints',
  'Ranged', 'Prayer', 'Magic', 'Cooking', 'Woodcutting',
  'Fletching', 'Fishing', 'Firemaking', 'Crafting',
  'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving',
  'Slayer', 'Farming', 'Runecrafting', 'Hunter',
  'Construction'
]

const LOWER_SKILL_NAMES = SKILL_NAMES.map(x => x.toLowerCase())

function mergeSkillReqs (reqs, level, skill) {
  return level > 0
    ? { ...reqs, [LOWER_SKILL_NAMES[skill]]: level }
    : reqs
}

function deserializeQuest (quest) {
  return {
    slug: slugify(quest.name),
    name: quest.name,
    reqs: {
      skills: quest.requirement.reduce(mergeSkillReqs, {}),
      quests: uniq(quest.relatedQuests.map(slugify))
    }
  }
}

db.setState(data.map(deserializeQuest))

export const Quests = db

export const getBySlug = memoize(function (slug) {
  return Quests.find({ slug }).value()
})

export const getRandomQuest = function () {
  return Quests.sample().value()
}

// export function traverse () {
//   const G = new Graph()

//   function addPreReq (g, s) {
//     const quest = db.find({ slug: s }).value()
//     if (quest && quest.reqs) {
//       quest.reqs.quests.forEach(q => {
//         g.setEdge(s, q)
//         addPreReqs(g, q)
//       })
//   }

//   db.each(x => addPreReqs(G, x.slug))

//   return gl.alg.topsort(G)
// }

export function getGraph (slug) {
  const g = new Graph()
  g.setNode(slug)
  function addPreReqs (s) {
    const quest = getBySlug(s)
    if (quest && quest.reqs) {
      quest.reqs.quests.forEach(q => {
        g.setEdge(s, q)
        addPreReqs(q)
      })
    }
  }
  addPreReqs(slug)
  console.log(gl.alg.topsort(g))
  return g
}
