const ControlTower = require('./class.control.tower');
class ControlTowersCentral {
  constructor(allSpawns){
    this.allSpawns = allSpawns;
  }

  setControlTowers() {
    //for each spawn there should be a control tower responsible for that room
    //control tower id = spawnId + roomId

    //check if there is a Memory object for the control towers
    if(!Memory.controlTowers){
      Memory.controlTowers = JSON.stringify(new Array());
    }

    let allControlTowers = JSON.parse(Memory.controlTowers);

    for(const spawn in this.allSpawns){
      const spawnObject = this.allSpawns[spawn];

      //is there a control tower for this spawn?
      let towerExists = false;

      for(const tower in allControlTowers){
        const controlTowerObject = allControlTowers[tower];
        console.log('controlTowerObject', JSON.stringify(controlTowerObject));
        if(controlTowerObject.id === `${spawnObject.id}_${spawnObject.roomId}`){
          towerExists = true;
        }
      }

      if(towerExists === false){
        console.log(`There is no control tower with id ${spawnObject.id}${spawnObject.roomId}, creating one...`);

        const newTower = this.createNewControlTower(spawnObject);
        console.log(`newTower`, JSON.stringify(newTower));

      }
      
    }
  }

  createNewControlTower(spawnInfo){
    const roomObject = Game.rooms[spawnInfo.roomId];

    const controller = roomObject.controller;

    const creepsToManage = [];

    for(const creep in Game.creeps){
      const creepObject = Game.creeps[creep];

      if(creepObject.memory.homeSpawn === spawnInfo.spawnName){
        creepsToManage.push(creepObject.id);
      }
    }

    const playerStructuresInThisRoom = [];

    roomObject.find(FIND_MY_STRUCTURES).map(structureObject => {
      playerStructuresInThisRoom.push({
        id: structureObject.id,
        structureType: structureObject.structureType
      });
    });

    const controlTowerObject = {
      id: `${spawnInfo.id}_${spawnInfo.roomId}`,
      controllerId: controller.id,
      creepsToManage,
      playerStructuresInThisRoom
    };

    return controlTowerObject;
  }
}

module.exports = ControlTowersCentral;
