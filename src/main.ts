import { AdjutantAI } from './class.ai';

const gameAI = new AdjutantAI();

module.exports.loop = () => {

  gameAI.tick();

}
