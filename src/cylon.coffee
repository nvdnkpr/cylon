###
 * cylon
 * cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

Robot = require("./robot")

require('./utils')
require('./logger')

Logger.setup()

module.exports = class Cylon
  instance = null

  @instance: (args...) ->
    instance ?= new Master(args...)

  class Master
    robots = []

    robot: (opts) =>
      opts.master = this
      robot = new Robot(opts)
      robots.push robot
      robot

    start: ->
      robot.start() for robot in robots
