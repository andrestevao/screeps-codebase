const config = require('./config');

class CommandCenter {
  constructor() {
    this.createdOn = Game.time;
    this.allSpawns = {};
    this.expireDate = this.createdOn + config.commandCenterMaxTicks;

    for(const spawn in Game.spawns){

      const spawnObject = Game.spawns[spawn];

      const newSpawnObject = {
        spawnName: spawnObject.name,
        id: spawnObject.id,
        roomId: spawnObject.room.id,
        controllerId: spawnObject.room.controller.id,
        creeps: []
      };

      for(const creep in Game.creeps){
        const creepObject = Game.creeps[creep];

        if(creepObject.memory.homeSpawn === spawn){
          newSpawnObject.creeps.push(creepObject.id);
        }
      }

      this.allSpawns[spawnObject.id] = newSpawnObject;
    }

  }
}

module.exports = CommandCenter;
