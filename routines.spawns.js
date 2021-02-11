const config = require('./config');

module.exports = () => {

  const spawns = Game.spawns;
  for(spawn in spawns){

    const spawnObject = spawns[spawn];

    let canSpawn = true;
    //how many creeps have this spawn as their home?
    let creepsFromThisSpawn = 0;

    for(creep in Game.creeps){
      const creepObject = Game.creeps[creep];
      if(creepObject.memory.homeSpawn === spawnObject.name){
        creepsFromThisSpawn++;
      }
    }


    //kill creeps if creepsQty > config.maxCreeps 
    if(creepsFromThisSpawn > config.maxCreeps)  {

      canSpawn = false;

      const creepsToKill = [];

      for(creep in Game.creeps){
        const creepObject = Game.creeps[creep];
        if(creepObject.memory.homeSpawn === spawnObject.name){
          creepsToKill.push(creepObject);
        }
      }

      const randomIndex = Math.floor(Math.random() * Math.floor(creepsToKill.length));

      creepsToKill[randomIndex].suicide();
    }

    //existe energia suficiente pra spawnar um creep?
    const store = spawnObject.store;

    const maxEnergy = store.getCapacity(RESOURCE_ENERGY);
    const energy = store.energy;

    if((maxEnergy - energy) === 0){
      //spawn creep
      //spawnObject.say('Tentando spawnar creep coletor');

      //only spawns creeps if below max creep config
      if(canSpawn){
        spawnObject.spawnCreep([WORK, CARRY, CARRY, MOVE], 'Coletor #'+Game.time, {
          memory: {
            role: 'coletor',
            homeSpawn: spawn,
            lastDelivery: 'spawn'
          }
        });
      }else{
        console.log(`Spawn ${spawn} cannot spawn more creeps.`);
      }
    }
  }

}
