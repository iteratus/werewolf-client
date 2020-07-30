export const voteToLynch = (): string[] => {
  // render list of other players
  // take vote
  const voteOnPlayer = [null];
  return voteOnPlayer;
};

export const doubleVoteToLynch = (): string[] => {
  // render list of other players
  // take double vote
  const voteOnPlayer = [null, null];
  return voteOnPlayer;
};

export const randomVoteToLynch = (): string[] => {
  return [Math.random() ? "" : null];
};

export const voteToKill = (): string[] => {
  const voteOnPlayer = [null];
  return voteOnPlayer;
};

export const chooseCouple = (): string[] => {
  // render list of all players
  // choose two players
  // set couple death action on player 1
  // set couple death action on players2
  // remove special action from amor/self
  const couple = [null, null];
  return couple;
};

export const revealMayor = () => {
  // set day-lynch action to doubleVoteToLynch
  return doubleVoteToLynch;
};
