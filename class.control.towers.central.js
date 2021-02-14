const config = require('./config');
const ControlTower = require('./class.control.tower');

class ControlTowersCentral {
  constructor(allSpawns){
    this.allSpawns = allSpawns;

    this.parseMemory();
    this.setControlTowers();
  }

  parseMemory(){
    if(!Memory.allControlTowers){
      Memory.allControlTowers = JSON.stringify(new Array());
    }

    this.allControlTowers = JSON.parse(Memory.allControlTowers);

  }

  getExpiredTowers(){
    let expiredTowers = [];
    
    for(const controlTower in this.allControlTowers){
      const controlTowerObject = this.allControlTowers[controlTower];

      if(Game.time > controlTowerObject.expireDate){
        expiredTowers.push(controlTowerObject.id);
      }
    }
  }

  setControlTowers() {
    //for each spawn there should be a control tower responsible for that room
    //control tower id = spawnId + roomId

    for(const spawn in this.allSpawns){
      const spawnObject = this.allSpawns[spawn];

      const towerId = `${spawnObject.id}_${spawnObject.roomId}`;

      //is there a control tower for this spawn?
      let towerExists = false;

      for(const tower in this.allControlTowers){
        const controlTowerObject = this.allControlTowers[tower];
        console.log('controlTowerObject', JSON.stringify(controlTowerObject));
        if(controlTowerObject.id === towerId){
          towerExists = true;
        }
      }

      if(towerExists === false){
        console.log(`There is no control tower with id ${towerId}, creating one...`);

        const newTower = this.createNewControlTower(spawnObject);
        console.log(`newTower`, JSON.stringify(newTower));

        this.allControlTowers[towerId] = newTower;

        this.addNewTowerToMemory(newTower);

      }
      
    }
  }

  addNewTowerToMemory(newTower) {
    const memoryObject = JSON.parse(Memory.allControlTowers);
    //add new towers
    memoryObject.push(newTower);
    console.log(JSON.stringify(memoryObject));

    Memory.allControlTowers = JSON.stringify(memoryObject);

    this.parseMemory();
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
      playerStructuresInThisRoom,
      createdOn: Game.time,
      expireDate: Game.time + config.controlTowerMaxTicks
    };

    return controlTowerObject;
  }

  tick() {
    console.log(`[class.control.towers.central] ${JSON.stringify(this.allControlTowers)}`);
  }
}

module.exports = ControlTowersCentral;
