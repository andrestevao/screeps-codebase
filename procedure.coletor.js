module.exports = (creepObject) => {
  const store = creepObject.store;
  const energy = store.energy;
  const maxEnergy = store.getCapacity(RESOURCE_ENERGY);
  const availableCapacity = store.getFreeCapacity(RESOURCE_ENERGY);

  if(availableCapacity === 0){
    creepObject.memory.delivering = true;
    creepObject.say(`FULL`);
  }else {
    creepObject.say(`${energy}/${maxEnergy}`);
  }

  if(creepObject.memory.delivering === true){
    deliver(creepObject);
    return;
  }

  if(!creepObject.memory.resourceTarget){
    creepObject.memory.resourceTarget = creepObject.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
  }

  const target = Game.getObjectById(creepObject.memory.resourceTarget);

  if(creepObject.harvest(target) == ERR_NOT_IN_RANGE) {
    const tryMove = creepObject.moveTo(target, { visualizePathStyle: { stroke: '#00FF00', opacity: 1 } }); //green

    if(tryMove === -2){
      changeTarget(creepObject);
    }
  }
}

const changeTarget = creepObject => {
  //current target
  const currentTarget = creepObject.memory.resourceTarget;
  //change creep resource target
  const allResources = Game.spawns[creepObject.memory.homeSpawn].room.find(FIND_SOURCES_ACTIVE);

  allResources.map(resource => {
    if(resource.id != currentTarget){
      creepObject.memory.resourceTarget = resource.id;
      return;
    }
  });
}

const deliver = creepObject => {
  //choose where to deliver, based on last delivery

  if(!creepObject.memory.finishedDelivering){
    creepObject.memory.finishedDelivering = false;
  }

  if(!creepObject.memory.lastDelivery){
    creepObject.memory.lastDelivery = 'spawn';
  }

  const lastDelivery = creepObject.memory.lastDelivery;

  if(lastDelivery == 'spawn'){
    //deliver to controller
    const roomController = Game.spawns[creepObject.memory.homeSpawn].room.controller;

    const tryUpgrade = creepObject.upgradeController(roomController);

    if(tryUpgrade == ERR_NOT_IN_RANGE){
      creepObject.moveTo(roomController, { visualizePathStyle: { stroke: '#FF0000', opacity: 1 } }); //red
    }

    //check if there is more energy to be delivered
    if(creepObject.store.energy == 0){
      creepObject.memory.delivering = false;
      creepObject.memory.lastDelivery = 'controller';
    }

    return
  }else{
    //deliver to spawn
    const homeSpawn = Game.spawns[creepObject.memory.homeSpawn];

    const tryTransfer = creepObject.transfer(homeSpawn, RESOURCE_ENERGY);

    if(tryTransfer == ERR_NOT_IN_RANGE) {
      creepObject.moveTo(homeSpawn, { visualizePathStyle: { stroke: '#0000FF', opacity: 1 } }); // blue
    }

    //check if there is more energy to be delivered
    if(creepObject.store.energy == 0){
      creepObject.memory.delivering = false;
      creepObject.memory.lastDelivery = 'spawn';
    }

    return;
  }
}
