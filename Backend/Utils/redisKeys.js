
// Base room prefix
const roomPrefix = (roomId) => `room:${roomId}`;

// Participants Hash → socketId -> username
const getParticipantsKey = (roomId) =>
  `${roomPrefix(roomId)}:participants`;

// Code String → full editor code
const getCodeKey = (roomId) =>
  `${roomPrefix(roomId)}:roomcode`;

// Chat List → array of messages
const getChatKey = (roomId) =>
  `${roomPrefix(roomId)}:chat`;

// Canvas String → JSON of canvas state
const getCanvasKey = (roomId) =>
  `${roomPrefix(roomId)}:canvas`;

// Meta Hash → createdAt, lastActivity, etc.
const getMetaKey = (roomId) =>
  `${roomPrefix(roomId)}:meta`;

module.exports = {getParticipantsKey,getCodeKey,getChatKey,getCanvasKey,getMetaKey};