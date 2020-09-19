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

export const chooseToTransform = (): Array<string> => {
  // render list of all villagers
  // choose player
  // set new role to selected player
  // remove special action from alpha/self
  const newWerewolf = [null];
  return newWerewolf;
};

export const decideToShoot = (): Array<string> => {
  // render list of all other players
  // choose player
  // remove special action from hunter/self
  const deadPlayer = [null];
  return deadPlayer;
};

export const checkIdentity = (): Array<string> => {
  // render list of all other players
  // choose player
  // show seer role from selected player
  const role = [null];
  return role;
};

export const decideToPoisen = (): Array<string> => {
  // render list of all other player
  // choose player
  // remove special action from witch/self
  const voteOnPlayer = [null];
  return voteOnPlayer;
};

export const decideToRevive = (): Array<string> => {
  // render list of dead players
  // choose player
  // revive player
  // remove special action from witch/self
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
