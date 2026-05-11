let io;

export const initSocket = (socketIo) => {
  io = socketIo;
};

export const emitEvent = (event, data) => {
  if (io) {
    io.emit(event, data);
  } else {
    console.warn('Socket.io not initialized. Event not emitted:', event);
  }
};

export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(userId).emit(event, data);
  }
};
