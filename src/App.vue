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
    <section v-if="state !== 'starting'" class="board">
      <h2 v-if="state === 'end'">Game Over!</h2>
      <div class="flex">
        <button v-if="state !== 'end' && (!flippedCard || flippedCard.type === 'end')" @click="flip()">FLIP</button>
        <card v-if="flippedCard" :card="flippedCard"/>
      </div>
      <div class="rows grow">
        <div v-for="(lane, index) of lanes" :key="index" class="flex">
          <button v-if="substate==='add' && !lane.picked" @click="add(index)" :disabled="lane.length === 3">
            ADD
          </button>
          <button v-if="state !== 'end' && substate==='take' && !lane.picked" @click="take(index)" :disabled="lane.length === 0">
            {{ lane.length === 0 ? 'LANE' : 'TAKE'}} {{index+1}}
          </button>
          <div v-for="(card, index) of lane" :key="index">
            <card :card="card"/>
          </div>
        </div>
      </div>
      <transition-group name="list-complete" class="grow">
        <div v-for="player of players" :key="player.name" class="players list-complete-item" :class="{done: player.done}">
          <span class="nums">
            <span class="blue" v-if="player.blue">{{player.blue}}</span>
            <span class="red" v-if="player.red">{{player.red}}</span>
            <span class="orange" v-if="player.orange">{{player.orange}}</span>
            <span class="yellow" v-if="player.yellow">{{player.yellow}}</span>
            <span class="brown" v-if="player.brown">{{player.brown}}</span>
            <span class="green" v-if="player.green">{{player.green}}</span>
            <span class="violet" v-if="player.violet">{{player.violet}}</span>
            <span class="wild" v-if="player.wild">{{player.wild}}</span>
            <span class="plus2" v-if="player.plus2">{{player.plus2}}</span>
          </span>
          <span contenteditable class="name">{{player.name}}</span>
          <span class="score">{{player.score}}</span>
        </div>
      </transition-group>
    </section>
  </div>
</template>

<script>
  window.onbeforeunload = function() {
    return true;
  };

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
        endOfGame: false,

        players: [],
        deck: [],
        lanes: []
      }
    },
    computed: {},
    methods: {
      setPlayers(num) {
        this.numPlayers = num
        this.buildDeck()
        for (let i = 0; i < num; i++) {
          this.lanes.push([])
          this.players.push({
            name: `P${i + 1}`,
            score: 0,
            plus2: 0,
            wild: 0
          })
          colors.forEach(color => this.players[i][color] = 0)
        }
        this.shuffle(this.deck)
        this.deck.splice(this.deck.length - 15, 0, {type: 'end'})
        this.state = 'playing'
      },
      buildDeck() {
        this.deck = []
        const numColors = this.numPlayers === 3 ? 6 : 7;
        for (let i = 0; i < numColors; i++) {
          for (let i = 0; i < 7; i++) {
            this.deck.push({type: 'color', color: colors[i]})
          }
        }
        for (let i = 0; i < 10; i++) {
          this.deck.push({type: 'plus2'})
        }
        for (let i = 0; i < 3; i++) {
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
      start() {
        this.state = 'playing'
      },
      getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))
      },
      flip() {
        let canFlip = false
        for (let i=0; i<this.lanes.length; i++) {
          if (!this.lanes[i].picked && this.lanes[i].length < 3) {
            canFlip = true
            break
          }
        }
        if (!canFlip) {
          return
        }
        this.flippedCard = this.deck.splice(0, 1)[0]
        if (this.flippedCard.type === 'end') {
          this.endOfGame = true
          return
        }
        this.substate = 'add'
      },
      add(index) {
        if (!this.lanes[index].picked && this.lanes[index].length < 3) {
          this.lanes[index].push(this.flippedCard)
          this.flippedCard = null
        }
        this.substate = 'take'
        this.nextPlayer()
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
        this.lanes[index].length = 0

        player.done = true
        // check for end of round/game
        if (!this.players.some(p => !p.done)) {
          if (this.endOfGame) {
            this.state = 'end'
            return
          }
          this.lanes.forEach(lane => lane.picked = false)
          this.players.forEach(player => player.done = false)
          this.calc(this.players[0])
          return
        }
        this.nextPlayer()
      },
      nextPlayer() {
        let p = this.players.splice(0, 1)[0]
        this.calc(p)
        this.players.push(p)
        while (this.players[0].done) {
          p = this.players.splice(0, 1)[0]
          this.players.push(p)
        }
      },
      calc(player) {
        const ordered = []
        colors.forEach(color => ordered.push(player[color]))
        ordered.sort((a, b) => b - a)
        for (let i = 0; i < player.wild; i++) {
          if (ordered[0] < 6) {
            ordered[0]++
          } else if (ordered[1] < 6) {
            ordered[1]++
          } else if (ordered[2] < 6) {
            ordered[2]++
          }
        }
        player.score = 0
        for (let i = 0; i < ordered.length; i++) {
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
    font-size: 5vw;
    background: black;
    color: rgb(194, 194, 194);
    font-family: monospace;
  }

  button {
    font-size: 3vw;
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

  .grow {
    flex-grow: 1;
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
    animation: rainbow 3s infinite;
    -webkit-animation: rainbow 3s infinite;
    -ms-animation: rainbow 3s infinite;
  }

  .plus2 {
    color: white;
  }

  .players {
    font-size: 10vh;
    display: flex;
  }

  .nums {
    flex-grow: 1;
    padding-right: 50px;
    text-align: center;
  }

  @-webkit-keyframes rainbow {
    0% {
      color: red;
    }
    15% {
      color: blue;
    }
    30% {
      color: brown;
    }
    45% {
      color: green;
    }
    60% {
      color: yellow;
    }
    75% {
      color: violet;
    }
    100% {
      color: orange;
    }
  }

  @-ms-keyframes rainbow {
    0% {
      color: red;
    }
    15% {
      color: blue;
    }
    30% {
      color: brown;
    }
    45% {
      color: green;
    }
    60% {
      color: yellow;
    }
    75% {
      color: violet;
    }
    100% {
      color: orange;
    }
  }

  @keyframes rainbow {
    0% {
      color: red;
    }
    15% {
      color: blue;
    }
    30% {
      color: brown;
    }
    45% {
      color: green;
    }
    60% {
      color: yellow;
    }
    75% {
      color: violet;
    }
    100% {
      color: orange;
    }
  }

  .board {
    display: flex;
    justify-content: space-between;
  }

  .list-complete-item {
    transition: all 1s;
    /*display: inline-block;*/
    /*margin-right: 10px;*/
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }

  .score {
    border: white 5px solid;
    border-radius: 50px;
  }

  h2 {
    float: left;
  }

  .rows {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .done {
    background-color: #414141;
    border-radius: 50px;
  }
</style>
