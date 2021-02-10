const coletorProcedure = require('procedure.coletor');

module.exports = () => {
  const creeps = Game.creeps;

  for(creepName in creeps){
    const creepObject = creeps[creepName];
    const role = creepObject.memory.role;

    switch(role){
      case 'coletor':
        coletorProcedure(creepObject);
        break;
    }
  }
}
