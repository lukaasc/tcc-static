function socketInit() {
  /* eslint-disable */
  const socket = io('http://localhost:8080', {
    transports: ['websocket', 'xhr-polling']
  });

  socket.on('hospitalChanged', data => {
    console.log("Hospital mudou!", data);
  });
  /* eslint-enable */
}

export default socketInit;
