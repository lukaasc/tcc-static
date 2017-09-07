function socketInit() {
  // eslint-disable-next-line no-undef
  io('http://localhost:8080', {
    transports: ['websocket', 'xhr-polling']
  });
}

export default socketInit;
