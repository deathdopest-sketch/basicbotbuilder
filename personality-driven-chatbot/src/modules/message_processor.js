// modules/MessageProcessor.js
// Responsible for: polling, de‑duping, turn‑taking, and handing off to commands/LLM.


const crypto = require('crypto');


class MessageProcessor {
constructor(engine, opts = {}) {
this.engine = engine;
this.pollingInterval = opts.pollingInterval ?? 2500;
this.maxRecentMessages = opts.maxRecentMessages ?? 100;
this.duplicateWindowMs = opts.duplicateWindow ?? 30_000;


// In‑memory ring buffer of recent message IDs
this.recent = [];
this.seen = new Map(); // id -> ts
}


// Create a stable ID for a message object
_id(m) {
const basis = `${m.room}|${m.nick}|${m.time}|${m.msg}`;
return crypto.createHash('sha1').update(basis).digest('hex');
}


_remember(id) {
const now = Date.now();
this.seen.set(id, now);
this.recent.push(id);
if (this.recent.length > this.maxRecentMessages) {
const drop = this.recent.shift();
this.seen.delete(drop);
}
// Expire old entries
for (const [mid, ts] of this.seen) {
if (now - ts > this.duplicateWindowMs) this.seen.delete(mid);
}
}


_isDuplicate(id, nick) {
if (this.engine.shouldBypassDuplicateDetection?.(nick)) return false;
return this.seen.has(id);
}


async checkForNewMessages(page, room, botNick) {
// Fallback selectors intentionally broad – adjust to your chat surface.
const raw = await page.evaluate(() => {
const nodes = document.querySelectorAll('div.message, .message');
const last = Array.from(nodes).slice(-20);
return last.map(el => {
const nick = (el.querySelector('span.nickname, .nickname, [data-nick]')?.textContent || '').trim();
const msg = (el.querySelector('span.message.common, .text, .content, [data-message]')?.textContent || '').trim();
const time = (el.querySelector('span.timestamp, time')?.textContent || '').trim();
return { nick, msg, time };
}).filter(m => m.nick && m.msg);
});


// Stamp room + id + basic filtering
const out = [];
for (const m of raw) {
m.room = room;
m.id = this._id(m);
if (!this._isDuplicate(m.id, m.nick)) out.push(m);
}
return out;
}


async processMessage(m, page, room, botNick) {
// Basic routing: commands first, then conversational logic
try {
if (!m?.msg) return;
if (m.msg.startsWith('.')) {
await this.engine.handleCommand(page, m.nick, m.msg, room, botNick);
this._remember(m.id);
return;
}


// Avoid bot replying to itself or other bots too eagerly
const lower = (m.nick || '').toLowerCase();
const selfNick = (botNick || this.engine.personality?.identity?.name || '').toLowerCase();
if (lower === selfNick) return;


// Heuristics: mention‑based or periodic engagement
const mentionsBot = new RegExp(`\\b${selfNick}\\b`, 'i').test(m.msg);
module.exports = MessageProcessor;