module.exports = (creepObject) => {
  const store = creepObject.store;
  const energy = store.energy;
  const maxEnergy = store.getCapacity(RESOURCE_ENERGY);
  const availableCapacity = store.getFreeCapacity(RESOURCE_ENERGY);

  if(availableCapacity === 0){
    creepObject.memory.constructing = true;
    creepObject.say(`FULL`);
  }else {
    creepObject.say(`${energy}/${maxEnergy}`);
  }

  if(creepObject.memory.constructing === true){
    construct(creepObject);
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
    }
  });
}

const construct = creepObject => {
  //choose where to deliver, based on last delivery

  if(!creepObject.memory.finishedConstructing){
    creepObject.memory.finishedConstructing = false;
  }

  if(creepObject.memory.currentConstruction){
    const targetConstruction = Game.getObjectById(creepObject.memory.currentConstruction);
    
    if(!targetConstruction){
        changeLocation(creepObject);
    }

    if(creepObject.build(targetConstruction) == ERR_NOT_IN_RANGE) {
      const tryMove = creepObject.moveTo(targetConstruction, { visualizePathStyle: { stroke: '#FF00FF', opacity: 1 } });

      if(tryMove === -2){ //couldnt find path to location
        changeLocation(creepObject);
      }
    }

    //if energy is depleted, set constructing to false
    if(creepObject.store.energy === 0){
      creepObject.memory.constructing = false;
    }

  }else{
    changeLocation(creepObject);
  }

}

const changeLocation = (creepObject) => {
  //searchs for a new construction site
  const room = creepObject.room;
  const allConstructionSites = room.find(FIND_CONSTRUCTION_SITES);

  allConstructionSites.map(site => {
    if(site.id != creepObject.memory.currentConstruction){
      creepObject.memory.currentConstruction = site.id;
      return;
    }
  });

}
