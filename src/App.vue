<template>
  <div id="app">
    <button v-if="!isFull" @click="goFullscreen(true)" style="font-size: 24pt; position: absolute; right: 0; top: 0;">
      fullscreen
    </button>
    <section v-if="state==='starting'">
      <h1>
        <span style="color: red;">C</span>
        <span style="color: blue;">o</span>
        <span style="color: #804000;">l</span>
        <span style="color: green;">o</span>
        <span style="color: yellow;">r</span>
        <span style="color: #7F00FF;">s</span>
      </h1>
      <p>select amount of players:</p>
      <div class="flex set-players">
        <button @click="setPlayers(3)" class="grow orange">3</button>
        <button @click="setPlayers(4)" class="grow red">4</button>
        <button @click="setPlayers(5)" class="grow violet">5</button>
      </div>
      <h2>how to play 👇</h2>
      <p class="small">
        Get the most points by collecting as much of the same color
        as possible. A large variety of colors will lower your score.
        <span class="wild-text">Wilds</span> are automatically counted as the highest scoring color.
        The <span class="plus2">2 cards</span> give you 2 points.
      </p>
    </section>

    <section v-else class="board">
      <div id="flipsville">
        <button id="flip-btn" :disabled="state === 'end'" v-if="!flippedCard" @click="flip()">
          FLIP
        </button>
        <button id="flipped-card" v-else @click="flip()" :disabled="flippedCard.type !== 'end'" style="background: none; font-size: 5vw">
          <card :card="flippedCard" style="height: 100%"/>
        </button>
        <p style="font-size: 5vh; display: flex; flex-direction: column; justify-content: space-between; margin: 0;">
          <span v-if="state === 'end'">
            <span>Game Over</span>
            <button @click="newGame()">New Game</button>
          </span>
          <span v-else-if="flippedCard">
            <span v-if="flippedCard.type === 'end'">
              Final round!
            </span>
            <span v-else>
              Choose place
            </span>
          </span>
          <span v-else>
            Flip or Take
          </span>

          <span>
            Scoring
            <score/>
          </span>
        </p>
      </div>

      <!-- Cards -->
      <div :class="{three: numPlayers === 3, four: numPlayers === 4, five: numPlayers === 5}">
        <div v-for="(lane, index) of lanes" :key="index" class="row">
          <button v-if="substate==='add' && !lane.picked" @click="add(index)" :disabled="lane.length === 3" style="white-space: nowrap">
            DROP {{index+1}}
          </button>
          <button v-else-if="state !== 'end' && substate==='take' && !lane.picked" @click="take(index)" :disabled="lane.length === 0" class="take">
            {{ lane.length === 0 ? 'LANE' : 'TAKE'}} {{index+1}}
          </button>
          <button v-else disabled :class="{strikeout: lane.picked}" style="white-space: nowrap">
            LANE {{index+1}}
          </button>
          <card v-for="(card, index) of lane" :key="index" :card="card" :rotate="true"/>
        </div>
      </div>

      <!-- Players -->
      <transition-group name="list-complete" :class="{three: numPlayers === 3, four: numPlayers === 4, five: numPlayers === 5}">
        <div v-for="player of players" :key="player.name" class="player list-complete-item" :class="{done: player.done}">
          <span class="nums">
            <span class="num blue" v-if="player.blue">{{player.blue}}</span>
            <span class="num red" v-if="player.red">{{player.red}}</span>
            <span class="num orange" v-if="player.orange">{{player.orange}}</span>
            <span class="num yellow" v-if="player.yellow">{{player.yellow}}</span>
            <span class="num brown" v-if="player.brown">{{player.brown}}</span>
            <span class="num green" v-if="player.green">{{player.green}}</span>
            <span class="num violet" v-if="player.violet">{{player.violet}}</span>
            <span class="num wild" v-if="player.wild">{{player.wild}}</span>
            <span class="num plus2" v-if="player.plus2">{{player.plus2}}</span>
          </span>
          <span contenteditable class="name">{{player.name}}</span>
          <span class="score">{{player.score}}</span>
        </div>
      </transition-group>
    </section>
  </div>
</template>

<script>
  import Score from "@/components/Score";
  window.onbeforeunload = function () {
    return true;
  };

  import Card from './components/Card.vue'

  const colors = ['blue', 'brown', 'green', 'orange', 'red', 'violet', 'yellow']

  export default {
    name: 'app',
    components: {
      Score,
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
        lanes: [],

        isFull: false
      }
    },
    computed: {},
    methods: {
      newGame() {
        this.substate = 'take'
        this.flippedCard = null
        this.endOfGame = false

        this.lanes = []
        this.buildDeck()
        const lastPlayers = this.players
        this.players = []
        for (let i = 0; i < this.numPlayers; i++) {
          this.lanes.push([])
          this.players.push({
            name: lastPlayers[i].name,
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
          for (let j = 0; j < 7; j++) {
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
        if (this.flippedCard && this.flippedCard.type !== 'end') {
          return
        }
        let canFlip = false
        for (let i = 0; i < this.lanes.length; i++) {
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
        if (!this.flippedCard) {
          return
        }
        if (this.flippedCard.type === 'end') {
          return
        }
        if (index < 0 || index > this.lanes.length-1) {
          return
        }
        if (this.lanes[index].picked) {
          return
        }
        if (this.lanes[index].length >= 3) {
          return
        }
        this.lanes[index].push(this.flippedCard)
        this.flippedCard = null
        this.substate = 'take'
        this.nextPlayer()
      },
      take(index) {
        if (index < 0 || index > this.lanes.length-1) {
          return
        }
        if (this.lanes[index].picked) {
          return
        }
        if (this.lanes[index].length === 0) {
          return 0
        }
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
        this.calc(this.players[0])
        // check for end of round/game
        if (!this.players.some(p => !p.done)) {
          if (this.endOfGame) {
            this.state = 'end'
            return
          }
          this.lanes.forEach(lane => lane.picked = false)
          this.players.forEach(player => player.done = false)
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
        return 21
      },
      isFullScreen() {
        const attemptToGetState = element => element && element !== null
        this.isFull = attemptToGetState(document.fullscreenElement) ||
          attemptToGetState(document.webkitFullscreenElement) ||
          attemptToGetState(document.mozFullScreenElement) ||
          attemptToGetState(document.msFullscreenElement)
      },
      goFullscreen(v) {
        if (v === true) {
          const el = document.body;
          const requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
            || el.mozRequestFullScreen || el.msRequestFullScreen;

          if (requestMethod) {
            requestMethod.call(el)
          }
          return
        }
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      },
      addOrTake(index) {
        if (this.flippedCard) {
          this.add(index)
        } else {
          this.take(index)
        }
      }
    },
    mounted() {
      setInterval(this.isFullScreen, 1000)
      window.addEventListener('keypress', e => {
        if (this.state === 'end') {
          return
        }
        if (e.key === 'f') {
          this.flip()
        } else if (e.key === '1') {
          this.addOrTake(0)
        } else if (e.key === '2') {
          this.addOrTake(1)
        } else if (e.key === '3') {
          this.addOrTake(2)
        } else if (e.key === '4') {
          this.addOrTake(3)
        } else if (e.key === '5') {
          this.addOrTake(4)
        }
      })
    },
  }
</script>

<style>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  h1 {
    margin: 0;
    text-align: center;
  }



  p {
    margin: 0;
    margin-left: 1rem;
    font-size: 14pt;
  }

  body {
    font-size: 5vw;
    background: black;
    color: rgb(194, 194, 194);
    font-family: ui-monospace, monospace;
  }

  .main {
    display: grid;
    grid-template-rows: 4rem 1fr;
  }

  .board {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr;
    grid-gap: 1rem;
    max-height: 100%;
    height: 100%;
    max-width: 100%;
  }

  h2 {
    font-size: 24pt;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
    padding: 0;
    width: 100%;
  }

  button {
    font-size: 3vw;
    background: rgb(61, 61, 61);
    border: 0;
    border-radius: 5px;
    color: white;
    padding: .25rem;
    cursor: pointer;
    font-family: ui-monospace, monospace;
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
    background: red;
  }

  .blue {
    color: white !important;
    background: blue;
  }

  .brown {
    background: #804000;
  }

  .green {
    background: green;
  }

  .orange {
    background: rgb(255, 136, 0);
  }

  .violet {
    background: #7F00FF;
  }

  .yellow {
    color: black !important;
    background: yellow;
  }

  .wild {
    animation: rainbow 3s infinite;
    -webkit-animation: rainbow 3s infinite;
    -ms-animation: rainbow 3s infinite;
  }

  .wild-text {
    animation: rainbow-text 3s infinite;
    -webkit-animation: rainbow-text 3s infinite;
    -ms-animation: rainbow-text 3s infinite;
  }

  .plus2 {
    color: black !important;
    background: white;
  }

  .end {
    color: black !important;
    background: white;
  }

  .player {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .done {
    background-color: #414141;
    border-radius: 10px;
    border: 1px black solid;
  }

  .nums {
    flex-grow: 1;
  }

  .num {
    color: white;
    border-radius: 3px;
    padding: 2px;
    margin-left: 5px;
  }

  @-webkit-keyframes rainbow {
    0% {
      background: red;
    }
    15% {
      background: blue;
    }
    30% {
      background: brown;
    }
    45% {
      background: green;
    }
    60% {
      background: yellow;
    }
    75% {
      background: #7F00FF;
    }
    100% {
      background: orange;
    }
  }

  @-ms-keyframes rainbow {
    0% {
      background: red;
    }
    15% {
      background: blue;
    }
    30% {
      background: #804000;
    }
    45% {
      background: green;
    }
    60% {
      background: yellow;
    }
    75% {
      background: #7F00FF;
    }
    100% {
      background: orange;
    }
  }

  @keyframes rainbow {
    0% {
      background: red;
    }
    15% {
      background: blue;
    }
    30% {
      background: #804000;
    }
    45% {
      background: green;
    }
    60% {
      background: yellow;
    }
    75% {
      background: #7F00FF;
    }
    100% {
      background: orange;
    }
  }

  @-webkit-keyframes rainbow-text {
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
      color: #7F00FF;
    }
    100% {
      color: orange;
    }
  }

  @-ms-keyframes rainbow-text {
    0% {
      color: red;
    }
    15% {
      color: blue;
    }
    30% {
      color: #804000;
    }
    45% {
      color: green;
    }
    60% {
      color: yellow;
    }
    75% {
      color: #7F00FF;
    }
    100% {
      color: orange;
    }
  }

  @keyframes rainbow-text {
    0% {
      color: red;
    }
    15% {
      color: blue;
    }
    30% {
      color: #804000;
    }
    45% {
      color: green;
    }
    60% {
      color: yellow;
    }
    75% {
      color: #7F00FF;
    }
    100% {
      color: orange;
    }
  }

  .list-complete-item {
    transition: all 1s;
    /*display: inline-block;*/
    /*margin-right: 10px;*/
  }

  .list-complete-enter, .list-complete-leave-to
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }

  .score {
    text-decoration: underline;
    margin-left: 5px;
  }

  .three {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: .25rem;
  }

  .four {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 1rem;
  }

  .five {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-gap: .25rem;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-height: 100%;
    overflow: hidden;
  }

  .take {
    white-space: nowrap;
  }

  #flipped-card {
    width: 100%;
    margin-left: -1px;
  }

  .small {
    font-size: 16pt;
  }

  #flip-btn {
    width: 100%;
    height: 100%;
  }

  #flipsville {
    display: grid;
    grid-template-rows: .25fr .75fr;
    text-align: center;
    grid-gap: 1rem;
  }

  .strikeout {
    text-decoration: line-through;
  }
</style>
