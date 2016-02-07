'use strict'
require("babel-polyfill");

//import {tasklist as getPidList} from "./modules/tasklist.js"
import {_extendArrayPrototype} from "./modules/array_prototypes.js"
import {killchrome} from "./modules/killchrome.js"
import {rmdir} from "./modules/recdeldir.js"

_extendArrayPrototype() // add .includes function to the Array type
killchrome()
.then(() =>
{
  console.log("Deleting cache folder.");
  deleteCacheFolder()
})
.catch(()=>
console.log("Failed to kill chrome instances"));



function deleteCacheFolder(){
  const path = require('path');
  const os = require('os')
  const home = os.homedir();
  let cacheFolder = path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User data');
  rmdir(cacheFolder);
}
