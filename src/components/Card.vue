<template>
  <div class="card">
    <div v-if="card.color === 'blue'" class="blue">B</div>
    <div v-if="card.color === 'brown'" class="brown">Br</div>
    <div v-if="card.color === 'green'" class="green">G</div>
    <div v-if="card.color === 'orange'" class="orange">O</div>
    <div v-if="card.color === 'red'" class="red">R</div>
    <div v-if="card.color === 'violet'" class="violet">V</div>
    <div v-if="card.color === 'yellow'" class="yellow">Y</div>
    <div v-if="card.type === 'wild'" class="wild">W</div>
    <div v-if="card.type === 'plus2'" class="plus2">2</div>
    <div v-if="card.type === 'end'" class="end">END</div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['card', 'rotate']
}
</script>

<style scoped>
  .card {
    color: black !important;
    text-align: center;
    min-width: 50px;
    min-height: 50px;
    margin-left: .25rem;

    display: flex;
    align-content: center;
    justify-content: center;
  }
  .card > div {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
</style>
