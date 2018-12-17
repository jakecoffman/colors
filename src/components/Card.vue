<template>
  <div class="card">
    <img v-if="card.color === 'blue'" src="../assets/blue.png"/>
    <img v-if="card.color === 'brown'" src="../assets/brown.png"/>
    <img v-if="card.color === 'green'" src="../assets/green.png"/>
    <img v-if="card.color === 'orange'" src="../assets/orange.png"/>
    <img v-if="card.color === 'red'" src="../assets/red.png"/>
    <img v-if="card.color === 'violet'" src="../assets/violet.png"/>
    <img v-if="card.color === 'yellow'" src="../assets/yellow.png"/>
    <img v-if="card.type === 'wild'" src="../assets/wild.png"/>
    <img v-if="card.type === 'plus2'" src="../assets/plus2.png"/>
    <img v-if="card.type === 'end'" src="../assets/end.png"/>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: {}
  }
}
</script>

<style scoped>

</style>
