export = function (server: Server) {
  const proximityQuery = server.where({ type: 'proximity-sensor' });
  const lightSwitchQuery = server.where({ type: 'light-switch' });

  server.observe([proximityQuery, lightSwitchQuery], function (proximity, lightSwitch) {
    const stream = proximity.createReadStream('proximity');

    // stream.on('data', function (msg) {
    //   if (msg.data && lightSwitch.available('turn-on')) {
    //     lightSwitch.call('turn-on');
    //   } else if (lightSwitch.available('turn-off')) {
    //     lightSwitch.call('turn-off');
    //   }
    // });
  });
};
