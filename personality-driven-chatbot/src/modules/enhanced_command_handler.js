// modules/EnhancedCommandHandler.js
if (out) await this.engine.sendMsg(page, out);
} catch (e) {
await this.engine.sendMsg(page, `⚠️ Command error: ${cmd}`);
} finally {
this.engine.lastCommandTime?.set?.(nick, Date.now());
}
}


// Built‑ins
_ping() { return '🏓 pong'; }
_help() {
const list = Array.from(this.commands.entries())
.filter(([, v]) => !v.meta?.hidden)
.map(([k, v]) => `.${k}${v.meta.ownerOnly ? ' (owner)' : ''}`)
.join(' ');
return `Commands: ${list}`;
}
_mood() {
const s = this.engine.currentEmotionalState || {};
const [emo, val] = Object.entries(s).sort((a, b) => b[1] - a[1])[0] || ['neutral', 0.5];
return `I feel ${emo} (${Math.round(val * 100)}%)`;
}
_personality() {
const p = this.engine.personality?.identity || {};
return `${p.displayName || p.name || 'Bot'}: ${p.background || 'no background set'}`;
}
_info({ nick }) {
const rel = this.engine.getUserRelationshipLevel?.(nick) || 'acquaintance';
return `${nick}, we are ${rel}.`;
}


// Owner
_grant({ args }) {
const t = args[0];
if (!t) return 'Usage: .grant <user>';
this.engine.privilegedUsers?.add?.(t.toLowerCase());
return `✅ ${t} granted privileged status`;
}
_revoke({ args }) {
const t = args[0];
if (!t) return 'Usage: .revoke <user>';
this.engine.privilegedUsers?.delete?.(t.toLowerCase());
return `❌ ${t} privilege revoked`;
}
_status() {
const rel = this.engine.userRelationships?.size || 0;
const priv = this.engine.privilegedUsers?.size || 0;
const blocked = this.engine.blockedUsers?.size || 0;
return `🤖 Status: ${rel} users | ${priv} privileged | ${blocked} blocked`;
}
}


module.exports = EnhancedCommandHandler;