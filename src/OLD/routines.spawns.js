const config = require('./config');

const allRoles = [
  'coletor',
  'construtor'
];

module.exports = () => {

  const spawns = Game.spawns;
  for(const spawn in spawns){

    const spawnObject = spawns[spawn];

    let canSpawn = true;
    //how many creeps have this spawn as their home?
    let creepsFromThisSpawn = 0;

    for(const creep in Game.creeps){
      const creepObject = Game.creeps[creep];
      if(creepObject.memory.homeSpawn === spawnObject.name){
        creepsFromThisSpawn++;
      }
    }


    //kill creeps if creepsQty > config.maxCreeps 
    if(creepsFromThisSpawn > config.maxCreeps)  {

      canSpawn = false;

      const creepsToKill = [];

      for(const creep in Game.creeps){
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
      //only spawns creeps if below max creep config
      if(canSpawn){
        //logic to define which creep role to spawn
        const creepRole = decideCreepRole(spawnObject);
        console.log('creepRole', creepRole);

        spawnObject
          .spawnCreep(
            [WORK, CARRY, CARRY, MOVE],
            `${creepRole} #${Game.time}`,
            {
              memory: {
                role: creepRole,
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

const decideCreepRole = (spawnObject) => {
  const roleQty = allRoles.length;
  const maxCreeps = config.maxCreeps;

  const maxCreepsPerRole = Math.floor(maxCreeps/roleQty);

  /*
  const balancedQtyCreeps = maxCreepsPerRole * roleQty;
  if(balancedQtyCreeps < maxCreeps){
    //we can spawn more creeps!
    //
  }
  */

  //search all creeps from this spawn
  const spawnName = spawnObject.name;
  const creepsFromThisSpawn = [];

  for(const creep in Game.creeps){
    const creepObject = Game.creeps[creep];

    if(creepObject.memory.homeSpawn === spawnName){
      creepsFromThisSpawn.push(creepObject);
    }
  }

  console.log('[routines.spawns.js] creepsFromThisSpawn', JSON.stringify(creepsFromThisSpawn));

  let roleQtys = [];

  allRoles.map(role => {
    roleQtys.push([role, 0]);
  });

  console.log('[routines.spawns.js] roleQtys com 0', JSON.stringify(roleQtys));


  creepsFromThisSpawn.map(creepObject => {
    const creepRole = creepObject.memory.role;
    
    //search in roleQtys for role
    roleQtys.map(roleArray => {
      if(roleArray[0] === creepRole){
        roleArray[1]++;
      }
    })

  });

  console.log('[routines.spawns.js] roleQtys', JSON.stringify(roleQtys));

  let role = '';
  for(let i = 0; i < roleQtys.length; i++){
    const roleArray = roleQtys[i];

    const roleName = roleArray[0];
    const roleQty = roleArray[1];

    if(roleQty < maxCreepsPerRole){
      role = roleName;
      break;
    }
  }

  return role;

}
