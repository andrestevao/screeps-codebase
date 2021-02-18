var config = require('./config');
var CommandCenter = /** @class */ (function () {
    function CommandCenter() {
        if (Memory.commandCenter) {
            var previousMemory = JSON.parse(Memory.commandCenter);
            this.createdOn = previousMemory.createdOn;
            this.allSpawns = previousMemory.allSpawns;
            this.expireDate = previousMemory.expireDate;
        }
        else {
            this.refreshCommandCenterMemory();
            this.saveNewMemory();
        }
        //load required classes to operate later
        //control towers functions
        //TBD
        //this.controlTowersCentral = new ControlTowersCentral(this.allSpawns);
    }
    CommandCenter.prototype.refreshCommandCenterMemory = function () {
        this.createdOn = Game.time;
        this.allSpawns = {};
        this.expireDate = this.createdOn + config.commandCenterMaxTicks;
        for (var spawn in Game.spawns) {
            var spawnObject = Game.spawns[spawn];
            var newSpawnObject = {
                spawnName: spawnObject.name,
                id: spawnObject.id,
                roomId: spawnObject.room.name,
            };
            this.allSpawns[spawnObject.id] = newSpawnObject;
        }
    };
    CommandCenter.prototype.saveNewMemory = function () {
        Memory.commandCenter = null;
        var newCommandCenterMemory = {
            createdOn: this.createdOn,
            allSpawns: this.allSpawns,
            expireDate: this.expireDate
        };
        Memory.commandCenter = JSON.stringify(newCommandCenterMemory);
    };
    CommandCenter.prototype.tick = function () {
        console.log("Command center has been created on tick " + this.createdOn + " and will expire on tick " + this.expireDate);
    };
    return CommandCenter;
}());
