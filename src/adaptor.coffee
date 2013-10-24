###
 * adaptor
 * cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

module.exports = class Adaptor
  constructor: (opts) ->
    @name = opts.name

  commands: ->
    ['smile', 'laugh', 'help']
