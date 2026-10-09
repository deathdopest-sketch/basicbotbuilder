// modules/OwnerPrivilegeSystem.js


class OwnerPrivilegeSystem {
constructor(engine, cfg = {}) {
this.engine = engine;
this.primaryOwner = (cfg.primaryOwner || '').toLowerCase();
this.additionalOwners = new Set((cfg.additionalOwners || []).map(s => s.toLowerCase()));
this.flags = {
bypassDuplicateDetection: !!cfg.bypassDuplicateDetection,
bypassCommandCooldowns: !!cfg.bypassCommandCooldowns,
logOwnerActivities: cfg.logOwnerActivities !== false,
};
}


isOwner(nick) {
if (!nick) return false;
const n = nick.toLowerCase();
return n === this.primaryOwner || this.additionalOwners.has(n);
}


shouldBypassDuplicateDetection(nick) {
return this.isOwner(nick) && this.flags.bypassDuplicateDetection;
}


shouldBypassCommandCooldown(nick) {
return this.isOwner(nick) && this.flags.bypassCommandCooldowns;
}


shouldBypassMessageCooldown(nick) {
// If needed separate from command cooldowns later
return this.shouldBypassCommandCooldown(nick);
}


getPrivilegeStatus() {
return {
primaryOwner: this.primaryOwner,
additionalOwners: Array.from(this.additionalOwners),
flags: this.flags,
};
}
}


module.exports = OwnerPrivilegeSystem;