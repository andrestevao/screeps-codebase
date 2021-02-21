interface adjutantMemory {
  createdOn: number;
  expireDate: number;
}

export class AdjutantAI {
  createdOn: number;
  expireDate: number;

  constructor(Memory, Game) {
    //"adjutantAI" property exists?
    if (!Memory["adjutantAI"]) {
      //create memory
      this.recreateMemory(Game, Memory);
    }

    //get what is in memory
    let adjutantMemory: adjutantMemory = JSON.parse(Memory.adjutantAI);

    if (Game.time > adjutantMemory.expireDate) {
      //recreate memory
      this.recreateMemory(Game, Memory);
    }else {
      this.getCurrentMemory(Memory);
    }

  }

  public tick() {
    //memory needs to be updated?
    if (this.createdOn > Game.time) {
      console.log(
        `Memory expired (current tick: ${Game.time} | expire date: ${this.expireDate}). Recreating memory...`
      );
      this.recreateMemory(Game, Memory);
    }

    console.log(
      `[AdjutantAI - Memory refresh at ${this.createdOn}] Current tick: ${Game.time}, refreshes in ${this.expireDate}`
    );
  }

  private recreateMemory(Game, Memory) {
    this.createdOn = Game.time;
    this.expireDate = Game.time + 100;

    Memory["adjutantAI"] = JSON.stringify({
      createdOn: this.createdOn,
      expireDate: this.expireDate,
    });
  }

  public getCurrentMemory(Memory) {
    //get stuff from memory
    const currentMemory: adjutantMemory = JSON.parse(Memory.adjutantAI);

    this.createdOn = currentMemory.createdOn;
    this.expireDate = currentMemory.expireDate;

  }
}
