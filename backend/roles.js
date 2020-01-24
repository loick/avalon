export class Role {
  constructor({
    name,
    description = '',
    is_good = true,
    knows = [],
    known_by = [],
  } = {}) {
    this.name = name
    this.description = description
    this.is_good = is_good
    this.knows = knows
    this.known_by = known_by
  }

  is_good() {
    return this.is_good
  }

  is_evil() {
    return !this.is_good
  }
}

export const ROLES = {
  Merlin: {
    name: 'Merlin',
    description: 'Knows evil, must remain hidden',
    is_good: true,
    knows: ['Morgana', 'Assassin', 'Oberon', 'EvilGuy'],
    known_by: ['Percival'],
  },
  Percival: {
    name: 'Percival',
    description: 'Knows Merlin',
    is_good: true,
    knows: ['Merlin', 'Morgana'],
    known_by: [],
  },
  GoodGuy: {
    name: 'GoodGuy',
    description: 'Loyal Servant of Arthur',
    is_good: true,
    knows: [],
    known_by: [],
  },
  Mordred: {
    name: 'Mordred',
    description: 'Unknown to Merlin',
    is_good: false,
    knows: ['Morgana', 'Assassin', 'EvilGuy'],
    known_by: [],
  },
  Morgana: {
    name: 'Morgana',
    description: 'Appears as Merlin',
    is_good: false,
    knows: ['Mordred', 'Assassin', 'EvilGuy'],
    known_by: ['Merlin', 'Percival'],
  },
  Assassin: {
    name: 'Assassin',
    description: 'Minion of Mordred',
    is_good: false,
    knows: ['Mordred', 'Morgana', 'EvilGuy'],
    known_by: ['Merlin'],
  },
  Oberon: {
    name: 'Oberon',
    description: 'Unknown to Evil',
    is_good: false,
    knows: [],
    known_by: ['Merlin'],
  },
  EvilGuy: {
    name: 'EvilGuy',
    description: 'Minion of Mordred',
    is_good: false,
    knows: ['Mordred', 'Morgana', 'Assassin'],
    known_by: ['Merlin'],
  },
}

export const AVAILABLE_ROLES_PER_NB_PLAYERS = {
  5: [
    ROLES.Merlin,
    ROLES.Mordred,
    ROLES.Assassin,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
  ],
  6: [
    ROLES.Merlin,
    ROLES.Mordred,
    ROLES.Assassin,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
  ],
  7: [
    ROLES.Merlin,
    ROLES.Percival,
    ROLES.Mordred,
    ROLES.Morgana,
    ROLES.Assassin,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
  ],
  8: [
    ROLES.Merlin,
    ROLES.Percival,
    ROLES.Mordred,
    ROLES.Morgana,
    ROLES.Assassin,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
  ],
  9: [
    ROLES.Merlin,
    ROLES.Percival,
    ROLES.Mordred,
    ROLES.Morgana,
    ROLES.Assassin,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
  ],
  10: [
    ROLES.Merlin,
    ROLES.Percival,
    ROLES.Mordred,
    ROLES.Morgana,
    ROLES.Assassin,
    ROLES.Oberon,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
    ROLES.GoodGuy,
  ],
}
