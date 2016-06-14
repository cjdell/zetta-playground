/// <reference path="../typings/index.d.ts" />

import http = require('http');
import Promise = require('bluebird');

let espListener = false && NewEspListener();

type EspDiscoverMessage = {
  vendorId: string,
  name: string,
  switches: {
    name: string,
    code: string
  }[]
};

type EspListener = (remoteAddress: string, message: EspDiscoverMessage) => void;

function NewEspListener() {
  const listeners = [] as EspListener[];

  http.createServer((req, res) => {
    const chunks = [] as Buffer[];

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const reqText = Buffer.concat(chunks).toString('utf8');
      const remoteAddress = (req as any).connection.remoteAddress as string;

      listeners.forEach(callback => callback(remoteAddress, JSON.parse(reqText)));

      respondWithAcknowledgement();
    });

    function respondWithAcknowledgement() {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(new Buffer('ACK', 'utf8'));
      res.end();
    }
  }).listen(6789, '0.0.0.0');

  function attachListener(listener: EspListener) {
    listeners.push(listener);
  }

  return {
    attachListener
  }
}

function espAttachListener(listener: EspListener) {
  if (!espListener) espListener = NewEspListener();

  espListener.attachListener(listener);
}

type EspSendOptions = {
  host: string,
  path: string
};

function espSend(options: EspSendOptions) {
  return new Promise<string>((resolve, reject) => {
    http.request(options, (res) => {
      let str = '';

      res.on('data', function (chunk: Buffer) {
        str += chunk.toString('utf8');
      });

      res.on('end', function () {
        resolve(str);
      });
    }).end();
  });
}

function espQuery(ip: string) {
  return espSend({ host: ip, path: '/query' }).then(json => {
    return JSON.parse(json) as EspDiscoverMessage;
  });
}

export {
EspDiscoverMessage,
espAttachListener,
espSend,
espQuery
}
