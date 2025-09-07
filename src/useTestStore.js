import { defineStore } from 'pinia'
import MyPromise from './MyPromise'

const useTestStore = defineStore('testStore', {
  state: () => {
    return {
      count: 0
    }
  },
  actions: {
    increment() {
      this.count++
    },
    promiseIncrement() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.count++
          resolve()
        }, 1000)
      })
    },
    myPromiseIncrement() {
      return new MyPromise(resolve => {
        setTimeout(() => {
          this.count++
          resolve()
        }, 1000)
      })
    }
  }
})

export default useTestStore