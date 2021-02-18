const coletorProcedure = require('procedure.coletor');
const construtorProcedure = require('procedure.construtor');

const config = require('./config');

module.exports = () => {
  const creeps = Game.creeps;

  for(const creepName in creeps){
    const creepObject = creeps[creepName];
    const role = creepObject.memory.role;

    switch(role){
      case 'coletor':
        coletorProcedure(creepObject);
        break;
      case 'construtor':
        construtorProcedure(creepObject);
        break;
    }
  }

}
