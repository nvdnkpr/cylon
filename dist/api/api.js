/*
 * api
 * cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  var namespace, restify, socketio;

  restify = require('restify');

  socketio = require('socket.io');

  namespace = require('node-namespace');

  namespace("Api", function() {
    return this.Server = (function() {
      var master;

      master = null;

      function Server(opts) {
        var _this = this;
        if (opts == null) {
          opts = {};
        }
        this.host = opts.host || "127.0.0.1";
        this.port = opts.port || "3000";
        master = opts.master;
        this.server = restify.createServer({
          name: "Cylon API Server"
        });
        this.io = socketio.listen(this.server);
        this.server.use(restify.bodyParser({
          mapParams: false
        }));
        this.server.get("/robots", this.getRobots);
        this.server.get("/robots/:robotid", this.getRobotByName);
        this.server.get("/robots/:robotid/devices", this.getDevices);
        this.server.get("/robots/:robotid/devices/:deviceid", this.getDeviceByName);
        this.server.get("/robots/:robotid/devices/:deviceid/commands", this.getDeviceCommands);
        this.server.post("/robots/:robotid/devices/:deviceid/commands/:commandid", this.runDeviceCommand);
        this.server.listen(this.port, this.host, function() {
          return Logger.info("" + _this.server.name + " is listening at " + _this.server.url);
        });
      }

      Server.prototype.getRobots = function(req, res, next) {
        var robot;
        return res.send((function() {
          var _i, _len, _ref, _results;
          _ref = master.robots();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            robot = _ref[_i];
            _results.push(robot.data());
          }
          return _results;
        })());
      };

      Server.prototype.getRobotByName = function(req, res, next) {
        return master.findRobot(req.params.robotid, function(err, robot) {
          return res.send(err ? err : robot.data());
        });
      };

      Server.prototype.getDevices = function(req, res, next) {
        return master.findRobot(req.params.robotid, function(err, robot) {
          return res.send(err ? err : robot.data().devices);
        });
      };

      Server.prototype.getDeviceByName = function(req, res, next) {
        var deviceid, robotid;
        robotid = req.params.robotid;
        deviceid = req.params.deviceid;
        return master.findRobotDevice(robotid, deviceid, function(err, device) {
          return res.send(err ? err : device.data());
        });
      };

      Server.prototype.getDeviceCommands = function(req, res, next) {
        var deviceid, robotid;
        robotid = req.params.robotid;
        deviceid = req.params.deviceid;
        return master.findRobotDevice(robotid, deviceid, function(err, device) {
          return res.send(err ? err : device.data().commands);
        });
      };

      Server.prototype.runDeviceCommand = function(req, res, next) {
        var commandid, deviceid, key, params, robotid, value, _ref;
        robotid = req.params.robotid;
        deviceid = req.params.deviceid;
        commandid = req.params.commandid;
        params = [];
        if (typeof req.body === 'object') {
          _ref = req.body;
          for (key in _ref) {
            value = _ref[key];
            params.push(value);
          }
        }
        return master.findRobotDevice(robotid, deviceid, function(err, device) {
          var result;
          if (err) {
            return res.send(err);
          }
          result = device[commandid].apply(device, params);
          return res.send({
            result: result
          });
        });
      };

      return Server;

    })();
  });

}).call(this);