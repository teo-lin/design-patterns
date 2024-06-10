import {Singleton} from './SingletonBad'
import * as MySingleton from './SingletonBad'

const s1 = new Singleton()
const s2 = new MySingleton.Singleton()
console.log(s1 === s2) // true
console.log( Object.is(s1, s2) )