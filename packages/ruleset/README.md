# Ruleset

**NOTE:** This is still a _DRAFT_!

## Pre-Sequence: Game start

- Distribute roles randomly according to balancing
- Amor chooses the couple

## Resolutions

Resolutions are actions that get executed independend of the current point in the sequence.
They represent reactions to the actions.

- onDeath
  - informAboutDeath
  - otherFromCoupleDeath
  - chooseHunterTarget

## Sequence

The sequence maps to the regular game progression of night-day-evening
with discussion and voting time.

- Show intro message
- Run specific sequence
- Resolve actions

### Night

No talking.

- Seer chooses to see one player's role
  - Role is revealed to seer
- Werewolves choose a victim to kill (votes shown to other werewolves)
  - Player with plurality is eated; tie-breaker: no-one gets eated
    - Witch decides to revive the victim or not (if applicable; 1 revive per game)
  - Witch decides to kill a player or not (once per game)

### Day

People discuss for a couple minutes.

- Mayor can reveal their role
  - vote -> doubleVote

### Evening

People vote, discussion ending.

- All players vote who to lynch
  - Player with plurality is lynched
