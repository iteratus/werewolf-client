export const voteToLynch = (): Array<string> => {
  // render list of other players
  // take vote
  const voteOnPlayer = [null];
  return voteOnPlayer;
};

export const doubleVoteToLynch = (): Array<string> => {
  // render list of other players
  // take double vote
  const voteOnPlayer = [null, null];
  return voteOnPlayer;
};

export const randomVoteToLynch = (): Array<string> => {
  return [Math.random() ? "" : null];
};

export const voteToKill = (): Array<string> => {
  const voteOnPlayer = [null];
  return voteOnPlayer;
};

export const chooseCouple = (): Array<string> => {
  // render list of all players
  // choose two players
  // set couple death action on player 1
  // set couple death action on players2
  // remove special action from amor/self
  const couple = [null, null];
  return couple;
};

export const revealMayor = (): Array<ActionObject> => {
  // set day-lynch action to doubleVoteToLynch
  const actions: Array<ActionObject> = [
    { lynch: "doubleVoteToLynch", reveal: "" }
  ];
  return actions;
};

// const funct = (boolParam: boolean): string => {
//   return true;
// };

// const myFunction = (boolParam: boolean): (() => string) => {
//   return () => String(boolParam);
// };

type action = "lynch" | "reveal";
type ActionObject = { [key in action]?: string };
