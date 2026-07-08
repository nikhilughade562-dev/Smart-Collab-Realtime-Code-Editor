
// Base room prefix
const roomPrefix = (roomId) => `room:${roomId}`;

// Participants Hash → socketId -> username
const getParticipantsKey = (roomId) =>
  `${roomPrefix(roomId)}:participants`;

// Code String → full editor code
const getCodeKey = (roomId) =>
  `${roomPrefix(roomId)}:roomcode`;

module.exports = {getParticipantsKey,getCodeKey};