const config = require('./config');

module.exports = () => {
  const spawns = Game.spawns;
  for(spawn in spawns){

    const spawnObject = spawns[spawn];

    //existe energia suficiente pra spawnar um creep?
    const store = spawnObject.store;

    const maxEnergy = store.getCapacity(RESOURCE_ENERGY);
    const energy = store.energy;

    if((maxEnergy - energy) === 0){
      //spawn creep
      //spawnObject.say('Tentando spawnar creep coletor');

      //how many creeps have this spawn as their home?
      const creepsFromThisSpawn = 0;

      for(creep in Game.creeps){
        if(creep.homeSpawn === spawnObject.name){
          creepsFromThisSpawn++;
        }
      }

      //only spawns creeps if below max creep config
      if(creepsFromThisSpawn <= config.maxCreeps){
        spawnObject.spawnCreep([WORK, CARRY, CARRY, MOVE], 'Coletor #'+Game.time, {
          memory: {
            role: 'coletor',
            homeSpawn: spawn
          }
        });
      }else{
        console.log(`Spawn ${spawn} cannot spawn more creeps.`);
      }
    }
  }

}
