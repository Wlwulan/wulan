"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class IndexService {
  constructor() {}

  getData() {
    return new Promise((resolve, reject) => {
      resolve({
        data: "Hello Index"
      });
    });
  }

}

exports.default = IndexService;