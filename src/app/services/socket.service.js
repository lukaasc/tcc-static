function Socket() {
  const watches = {};
  const recommendationWatches = [];

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

      socket.on('hospitalRecommendation', data => {
        angular.forEach(recommendationWatches, watcher => {
          watcher(data);
        });
      });
      /* eslint-enable */
    },
    watch(item, callback) {
      watches[item] = callback;
    },
    unWatch(item) {
      delete watches[item];
    },
    subscribe(callback) {
      recommendationWatches.push(callback);
    }
  };
}

// export default socketInit;
export default Socket;
