const operateTowers = (roomObject) => {
  const towersInThisRoom = roomObject.find(
    FIND_MY_STRUCTURES,
    {
      filter: {
        structureType: STRUCTURE_TOWER
      }
    }
  );

  //are there any enemies in this room?
  const hostiles = roomObject.find(FIND_HOSTILE_CREEPS);
  if(hostiles.length > 0){
    towersInThisRoom.forEach(tower => {
      const tryAttack = tower.attack(hostiles[0]);
      //console.log(`Tower ${tower.id} trying to attack hostile creep ${hostiles[0].id}. Result = ${tryAttack}`);
    });
  }

  //are there any structures to repair?
  const myStructures = roomObject.find(FIND_MY_STRUCTURES);
  myStructures.map(structureObject => {
    console.log('structureObject', JSON.stringify(structureObject));
  });

  const toRepair = roomObject.find(FIND_STRUCTURES, 
    { 
      filter: (structure) => { 
        return (structure.hits < 5000) && (structure.hits > 0);
      }
    }
  );

  //repair a random structure that needs repairing

  const randomIndex = Math.floor(Math.random() * (toRepair.length - 1));
  const structureObject = toRepair[randomIndex];

  towersInThisRoom.forEach(tower => {
    const tryRepair = tower.repair(structureObject);
    console.log(`Tower ${tower.id} trying to repair ${structureObject.id}. Result = ${tryRepair}`);
  });

};

module.exports = () => {
  for(const room in Game.rooms){
    const roomObject = Game.rooms[room];
    operateTowers(roomObject);
  }
};
