# Cylon.js 

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using node.js

It provides a simple, yet powerful way to create solutions that incorporate multiple, different hardware devices at the same time.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon.png?branch=master)](http://travis-ci.org/hybridgroup/cylon)

## Getting Started

Install the module with: `npm install cylon`

Then install modules for whatever hardware support you want to use from your robot. For example, `npm install cylon-firmata` to use Cylon with an Arduino using the Firmata protocol.

## Examples

**Note:** before running examples in the `examples/` dir from source, make sure to compile using `grunt coffee` first.

### Javascript:
```javascript
var Cylon = require("cylon");

// Initialize the robot
var robot = Cylon.robot({
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },
  device: { name: 'led', driver: 'led', pin: 13 },

  work: function(my) {
    // we do our thing here
    every((1).second(), function() { my.led.toggle(); });
  }
});

// start working
robot.start();
```

### CoffeeScript:
```coffee-script
Cylon = require "cylon"

# Initialize the robot
robot = Cylon.robot
  connection:
    name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0'

  device:
    name: 'led', driver: 'led', pin: 13

  work: (my) ->
    # we do our thing here
    every 1.second(), -> my.led.toggle()

robot.start()
```

## Hardware Support
Cylon.js has a extensible system for connecting to hardware devices. The following robotics and physical computing platforms are currently supported:

  - [Arduino](http://www.arduino.cc/) <=> [Adaptor](https://github.com/hybridgroup/cylon-firmata)
  - [Ardrone](http://ardrone2.parrot.com/) <=> [Adaptor](https://github.com/hybridgroup/cylon-ardrone)
  - [Sphero](http://www.gosphero.com/) <=> [Adaptor](https://github.com/hybridgroup/cylon-sphero)

Support for common shared device drivers, is provded using the General Purpose Input/Output (GPIO) module:

  - [GPIO](https://en.wikipedia.org/wiki/General_Purpose_Input/Output) <=> [Drivers](https://github.com/hybridgroup/cylon-gpio)

More platforms and drivers are coming soon...

## Documentation
We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [Grunt](http://gruntjs.com/).

## Release History
Version 0.1.0 - Initial release for ongoing development

Version 0.2.0 - Cylon.Basestar to help develop external adaptors/drivers

Version 0.3.0 - Improved Cylon.Basestar, and added API

## License
Copyright (c) 2013 The Hybrid Group. Licensed under the Apache 2.0 license.
