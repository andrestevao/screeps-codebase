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
};

module.exports = () => {
  for(const room in Game.rooms){
    const roomObject = Game.rooms[room];
    operateTowers(roomObject);
  }
};
