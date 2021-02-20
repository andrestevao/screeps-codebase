export class AdjutantAI {

  adjutantMemory: Memory;
  createdOn: number;
  expireDate: number;

  constructor(){
    this.recreateMemory();
  }

  public tick(){
    //memory needs to be updated?
    if(this.createdOn > Game.time){
      console.log(`Memory expired (current tick: ${Game.time} | expire date: ${this.expireDate}). Recreating memory...`);
      this.recreateMemory();
    }

    console.log(`[AdjutantAI - Memory refresh at ${this.createdOn}] Current tick: ${Game.time}, refreshes in ${this.expireDate}`);
  }

  private recreateMemory(){
    this.adjutantMemory = Memory;
    this.createdOn = Game.time;
    this.expireDate = Game.time + 100;
  }

}
