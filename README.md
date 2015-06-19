# varied-definition.js

manipulate and flatten definition Objects that include one or more variations

[![npm module](https://img.shields.io/npm/v/@blinkmobile/varied-definition.svg)](https://www.npmjs.com/package/@blinkmobile/varied-definition)
[![travis-ci](https://img.shields.io/travis/blinkmobile/varied-definition.js.svg)](https://travis-ci.org/blinkmobile/varied-definition.js)


## What is this?

This project provides helper functions for consuming a definition and extracting
a specific variation out of one or more possible configurations.

### What is a "configuration"?

A configuration is just an Object with properties and values, where that
specific combination of properties and values relates to specific purpose.

### What is a "variation"?

A variation is a named configuration, i.e. different in some ways and similar in
other ways to another configuration.

### What is a "definition"?

A definition is an Object with properties that are variations. There must be a
variation named "default". Other variations within the same definition may then
specify how they differ from the default.

The default configuration Object must have a "name" property. Declaring a
variation that changes the "name" property is not recommended.

The goal is to save transmission and storage size by putting common values in
the default variation, and just the differences in the other variations.

For low-level validation, see the
[JSON Schema specification](http://json-schema.org/) and our JSON
[schema](docs/schema.json).

See the [docs](docs) directory for more details.


## API

This module exports an Object with the following function(s) ...

### `flatten()`

- @param {Object} def a definition with a default and zero or more variations
- @param {String} [variation] the specific variation desired
- @param {FlattenOptions} [options] other parameters
- @throws {TypeError} if the definition doesn't meet our above requirements
- @return {Object} configuration for a single variation

#### @typedef FlattenOptions
- @type {Object}
- @property {String[]} [nesting] properties within the default configuration
- @property {String[]} [selection] properties within other configurations

See our documentation on [nesting configurations](docs/nested-definitions.md).
