export class Role {
  constructor({name, is_good=true, knows=[], known_by=[]}={}) {
    this.name = name
    this.is_good = is_good
    this.knows = knows
    this.known_by = known_by
  }

  is_good() {
    return this.is_good
  }

  is_evil() {
    return !(this.is_good)
  }
}

export const ROLES = {
  Merlin: { name:"Merlin", is_good=true, knows=["Morgana", "Assassin", "Oberon", "EvilGuy"], known_by=["Percival"] },
  Percival: { name:"Percival", is_good=true, knows=["Merlin", "Morgana"], known_by=[] },
  GoodGuy: { name:"GoodGuy", is_good=true, knows=[], known_by=[] },
  Mordred: { name:"Mordred", is_good=false, knows=["Morgana", "Assassin", "EvilGuy"], known_by=[] },
  Morgana: { name:"Morgana", is_good=false, knows=["Mordred", "Assassin", "EvilGuy"], known_by=["Merlin", "Percival"] },
  Assassin: { name:"Assassin", is_good=false, knows=["Mordred", "Morgana", "EvilGuy"], known_by=["Merlin"] },
  Oberon: { name:"Oberon", is_good=false, knows=[], known_by=["Merlin"] },
  EvilGuy: { name:"EvilGuy", is_good=false, knows=["Mordred", "Morgana", "Assassin"], known_by=["Merlin"] },
}

export const AVAILABLE_ROLES_PER_NB_PLAYERS = {
    5: [ROLES.Merlin, ROLES.Mordred, ROLES.Assassin, Role.GoodGuy, Role.GoodGuy],
    6: [ROLES.Merlin, ROLES.Mordred, ROLES.Assassin, Role.GoodGuy, Role.GoodGuy, Role.GoodGuy],
    7: [ROLES.Merlin, ROLES.Percival, ROLES.Mordred, ROLES.Morgana, ROLES.Assassin, Role.GoodGuy, Role.GoodGuy],
    8: [ROLES.Merlin, ROLES.Percival, ROLES.Mordred, ROLES.Morgana, ROLES.Assassin, Role.GoodGuy, Role.GoodGuy, Role.GoodGuy],
    9: [ROLES.Merlin, ROLES.Percival, ROLES.Mordred, ROLES.Morgana, ROLES.Assassin, Role.GoodGuy, Role.GoodGuy, Role.GoodGuy, Role.GoodGuy],
    10: [ROLES.Merlin, ROLES.Percival, ROLES.Mordred, ROLES.Morgana, ROLES.Assassin, ROLES.Oberon, Role.GoodGuy, Role.GoodGuy, Role.GoodGuy, Role.GoodGuy],
}
