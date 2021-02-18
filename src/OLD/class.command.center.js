const config = require('./config');
const ControlTowersCentral = require('./class.control.towers.central');

class CommandCenter {
  constructor() {
    //load command center memory

    if(Memory.commandCenter){
      const previousMemory = JSON.parse(Memory.commandCenter);

      this.createdOn = previousMemory.createdOn;
      this.allSpawns = previousMemory.allSpawns;
      this.expireDate = previousMemory.expireDate;
    }else{
      this.refreshCommandCenterMemory();
      this.saveNewMemory();
    }

    //load required classes to operate later
    //control towers functions
    this.controlTowersCentral = new ControlTowersCentral(this.allSpawns);

  }

  tick() {
    console.log(`[Tick ${Game.time}] Command center was created on ${this.createdOn} and will expire on ${this.expireDate}`);

    if(Game.time > this.expireDate){
      console.log(`Command center is expired.. updating values`);
      this.refreshCommandCenterMemory();
      this.saveNewMemory();
    }

    this.controlTowersCentral.tick();
  }

  refreshCommandCenterMemory(){
    this.createdOn = Game.time;
    this.allSpawns = {};
    this.expireDate = this.createdOn + config.commandCenterMaxTicks;

    for(const spawn in Game.spawns){

      const spawnObject = Game.spawns[spawn];

      const newSpawnObject = {
        spawnName: spawnObject.name,
        id: spawnObject.id,
        roomId: spawnObject.room.name,
      };

      this.allSpawns[spawnObject.id] = newSpawnObject;
    }

  }

  saveNewMemory() {
    Memory.commandCenter = null;

    const newCommandCenterMemory = {
      createdOn: this.createdOn,
      allSpawns: this.allSpawns,
      expireDate: this.expireDate
    };

    Memory.commandCenter = JSON.stringify(newCommandCenterMemory);
  }

}

module.exports = CommandCenter;
