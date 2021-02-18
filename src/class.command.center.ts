const config = require('./config');

interface Memory {
  commandCenter: string;
}

class CommandCenter {
  createdOn: number;
  allSpawns: object;
  expireDate: string;
  controlTowersCentral: object;

  constructor(){

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

    //TBD
    //this.controlTowersCentral = new ControlTowersCentral(this.allSpawns);

  }

  public refreshCommandCenterMemory(){
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

  public saveNewMemory(){
    Memory.commandCenter = null;

    const newCommandCenterMemory = {
      createdOn: this.createdOn,
      allSpawns: this.allSpawns,
      expireDate: this.expireDate
    };

    Memory.commandCenter = JSON.stringify(newCommandCenterMemory);
  }

  public tick(){
    console.log(`Command center has been created on tick ${this.createdOn} and will expire on tick ${this.expireDate}`);
  }

}
