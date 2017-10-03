function Socket() {
  const watches = {};

  return {
    init() {
      /* eslint-disable */
      const socket = io('http://localhost:8080', {
        transports: ['websocket', 'xhr-polling']
      });
      //const socket = io();

      socket.on('hospitalChanged', data => {
        return watches.hasOwnProperty(data.hospitalCode) ? watches[data.hospitalCode](data) : null;
      });
      /* eslint-enable */
    },
    watch(item, callback) {
      watches[item] = callback;
    },
    unWatch(item) {
      delete watches[item];
    }
  };
}

// export default socketInit;
export default Socket;
