<template>
  <div id="app">
    <section v-if="state==='starting'">
      <h1>Coloretto</h1>
      <p>Select number of players:</p>
      <div class="flex set-players">
        <button @click="setPlayers(3)">3</button>
        <button @click="setPlayers(4)">4</button>
        <button @click="setPlayers(5)">5</button>
      </div>
    </section>
    <section v-if="state === 'playing'">
      <div class="flex">
        <button v-if="substate==='take'" @click="flip()">FLIP</button>
        <card v-else :card="flippedCard"/>
      </div>
      <div v-for="(lane, index) of lanes" :key="index" class="flex">
        <button v-if="substate==='add'" @click="add(index)" :disabled="lane.picked || lane.length === 3">ADD</button>
        <button v-if="substate==='take'" @click="take(index)" :disabled="lane.picked || lane.length === 0">TAKE</button>
        <div v-if="!lane.picked" v-for="(card, index) of lane" :key="index">
          <card :card="card"/>
        </div>
      </div>
      <transition-group name="list-complete">
        <div v-for="player of players" :key="player.name" class="players">
          <span contenteditable>{{player.name}}</span>
          <span>{{player.score}}</span>
          <span class="blue" v-if="player.blue">{{player.blue}}</span>
          <span class="red" v-if="player.red">{{player.red}}</span>
          <span class="orange" v-if="player.orange">{{player.orange}}</span>
          <span class="yellow" v-if="player.yellow">{{player.yellow}}</span>
          <span class="brown" v-if="player.brown">{{player.brown}}</span>
          <span class="green" v-if="player.green">{{player.green}}</span>
          <span class="violet" v-if="player.violet">{{player.violet}}</span>
          <span class="wild" v-if="player.wild">{{player.wild}}</span>
          <span class="plus2" v-if="player.plus2">{{player.plus2}}</span>
        </div>
      </transition-group>
    </section>
  </div>
</template>

<script>
import Card from './components/Card.vue'

const colors = ['blue', 'brown', 'green', 'orange', 'red', 'violet', 'yellow']

export default {
  name: 'app',
  components: {
    Card
  },
  data() {
    return {
      state: 'starting',
      substate: 'take',
      numPlayers: 0,
      flippedCard: null,

      players: [],
      deck: [],
      lanes: []
    }
  },
  computed: {
  },
  methods: {
    setPlayers(num) {
      this.numPlayers = num
      this.buildDeck()
      for (let i=0; i<num; i++) {
        this.lanes.push([])
        this.players.push({
          name: `Player ${i+1}`,
          score: 0,
          plus2: 0,
          wild: 0
        })
        colors.forEach(color => this.players[i][color] = 0)
        this.players[i][colors[i]] = 1
      }
      this.shuffle(this.deck)
      this.deck.splice(this.deck.length-15, 0, {type: 'end'})
      this.state = 'playing'
    },
    buildDeck() {
      this.deck = []
      const numColors = this.numPlayers === 3 ? 6 : 7;
      for (let i=0; i<numColors; i++) {
        for(let i=0; i<7; i++) {
          this.deck.push({type: 'color', color: colors[i]})
        }
      }
      for(let i=0; i<10; i++) {
        this.deck.push({type: 'plus2'})
      }
      for(let i=0; i<3; i++) {
        this.deck.push({type: 'wild'})
      }
    },
    shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    flip() {
      this.flippedCard = this.deck.splice(0, 1)[0]
      this.substate = 'add'
    },
    add(index) {
      if (!this.lanes[index].picked && this.lanes[index].length < 3) {
        this.lanes[index].push(this.flippedCard)
        this.flippedCard = null
      }
      this.substate = 'take'
      const p = this.players.splice(0, 1)[0]
      this.players.push(p)
    },
    take(index) {
      this.lanes[index].picked = true
      const player = this.players[0]
      this.lanes[index].forEach(card => {
        if (card.type === 'color') {
          player[card.color]++
        } else {
          player[card.type]++
        }
      })
      player.done = true
      const p = this.players.splice(0, 1)[0]
      this.calc(p)
      this.players.push(p)
      // check for all players done, check for end of game
    },
    calc(player) {
      const ordered = []
      colors.forEach(color => ordered.push(player[color]))
      ordered.sort((a, b) => b-a)
      for (let i=0; i<player.wild; i++) {
        if(ordered[0] < 6) {
          ordered[0]++
        } else if(ordered[1] < 6) {
          ordered[1]++
        } else if(ordered[2] < 6) {
          ordered[2]++
        }
      }
      player.score = 0
      for(let i=0; i<ordered.length; i++) {
        if (i < 3) {
          player.score += this.scoreCard(ordered[i])
        } else {
          player.score -= this.scoreCard(ordered[i])
        }
      }
      player.score += 2 * player.plus2
    },
    scoreCard(input) {
      if (input < 2) {
        return input
      }
      if (input === 2) {
        return 3
      }
      if (input === 3) {
        return 6
      }
      if (input === 4) {
        return 10
      }
      if (input === 5) {
        return 15
      }
      if (input === 5) {
        return 21
      }
      return 0
    }
  }
}
</script>

<style>
body {
  background: black;
  color: rgb(194, 194, 194);
  font-family: sans-serif;
}
button {
  background: rgb(61, 61, 61);
  border: 0;
  border-radius: 5px;
  color: white;
  padding: 1rem;
  cursor: pointer;
}
[disabled] {
  background: rgb(163, 163, 163);
  cursor: not-allowed;
}
.flex {
  display: flex;
}
.set-players button {
  margin: 1rem;
}
.red {
  color: red;
}
.blue {
  color: blue;
}
.brown {
  color: brown;
}
.green {
  color: green;
}
.orange {
  color: rgb(255, 136, 0);
}
.violet {
  color: violet;
}
.yellow {
  color: yellow;
}
.wild {
  animation: rainbow 3s infinte;
  -webkit-animation: rainbow 3s infinite;
  -ms-animation: rainbow 3s infinite;
}
.plus2 {
  color: white;
}
.players {
  font-size: 9vw;
  display: flex;
  justify-content: space-evenly;
}
@-webkit-keyframes rainbow{
  0%{color: red;}
  15%{color: blue;}
	30%{color: brown;}
  45%{color: green;}
	60%{color: yellow;}
  75%{color: violet;}
	100%{color: orange;}
}
@-ms-keyframes rainbow{
  0%{color: red;}
  15%{color: blue;}
	30%{color: brown;}
  45%{color: green;}
	60%{color: yellow;}
  75%{color: violet;}
	100%{color: orange;}
}
@keyframes rainbow{
  0%{color: red;}
  15%{color: blue;}
	30%{color: brown;}
  45%{color: green;}
	60%{color: yellow;}
  75%{color: violet;}
	100%{color: orange;}
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
