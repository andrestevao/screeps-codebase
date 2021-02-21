import { AdjutantAI } from './class.ai';

module.exports.loop = () => {

  const gameAI = new AdjutantAI(Memory, Game);
  gameAI.tick();

}
