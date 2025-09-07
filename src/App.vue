<template>
 <div>{{ store.count }}</div>
 <button @click="store.increment">plus one</button>
 <button @click="store.promiseIncrement">promise plus one</button>
 <button @click="store.myPromiseIncrement">my promise plus one</button>
</template>

<script setup>
import useTestStore from './useTestStore'
const store = useTestStore()
store.$onAction(({ after }) => {
  console.log(Date.now(), 'actin started');
  after(() => {
    console.log(Date.now(), 'action finished');
  });
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
