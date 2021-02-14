const spawnsRoutine = require('./routines.spawns');
const creepsRoutine = require('./routines.creeps');
const towersRoutine = require('./routines.towers');

module.exports.loop = () => {
  spawnsRoutine();
  creepsRoutine();
  towersRoutine();

  let coletores = 0;
  let construtores = 0;
  for(const creep in Game.creeps){
    const creepObject = Game.creeps[creep];
    if(creepObject.memory.role === 'construtor'){
      construtores++;
    }else{
      coletores++;
    }
  }
  
  console.log(`There are ${coletores} coletores and ${construtores} construtores in the colony`);

}
