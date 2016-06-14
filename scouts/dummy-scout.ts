/// <reference path="../typings/index.d.ts" />

import http = require('http');
import Scout = require('zetta-scout');
import DummySwitch = require('../devices/dummy-switch');

export = class DummyScout extends Scout {
  init(next: () => void): void {
    this.startDiscoverer();

    next();
  }

  startDiscoverer() {
    let id = 1000;

    setInterval(() => {
      if (id > 1001) return;

      this.addDevice(String(id));

      id += 1;
    }, 5000);
  }

  addDevice(vendorId: string) {
    var query = this.server.where({ vendorId });

    this.server.find(query, (err, results) => {
      if (results.length > 0) {
        console.log('provision', vendorId, results);
        this.provision(results[0], DummySwitch, `Light Switch ${vendorId}`, vendorId);
      } else {
        console.log('discover', vendorId);
        this.discover(DummySwitch, `Light Switch ${vendorId}`, vendorId);
      }
    });
  }
}
