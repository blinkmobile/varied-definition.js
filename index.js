'use strict';

// this module

/**
* @private
* @param {Object} target the object to which properties will be added
* @param {Object} source the object from which properties will be copied
* @param {string} omit Names of fields to be ommited.
*
* @returns {Object} target
*/
function extend (target, source, omit) {
  if (!target || typeof target !== 'object') {
    throw new TypeError('1st argument must be an Object');
  }
  if (!source || typeof source !== 'object') {
    throw new TypeError('1st argument must be an Object');
  }
  Object.keys(source).forEach(function (prop) {
    var value = source[prop];

    if (omit && omit.indexOf(prop) > -1) {
      return;
    }

    if (typeof value === 'string') {
      if (value) {
        target[prop] = value.trim();
      }
    } else {
      target[prop] = value;
    }
  });
  return target;
}

/**
* @private
* @param {Objects[]} objects collection of [ { name: '...', ... }, ... ]
* @param {String[]} names desired ordering / filtering of objects
* @returns {Objects[]} sorted and filtered objects
*/
function sortAndFilterByName (objects, names) {
  var result;

  // remove all elements not needed for this variation
  result = objects.filter(function (o) {
    return names.indexOf(o.name) !== -1;
  });
  // sort elements as per the variation-specific order
  result.sort(function (a, b) {
    var aIndex, bIndex;
    aIndex = names.indexOf(a.name);
    bIndex = names.indexOf(b.name);
    return aIndex - bIndex;
  });

  return result;
}

/**
@private
@param {Object} def to test for type errors
@throws {TypeError}
*/
function typecheck (def) {
  if (!def || typeof def !== 'object') {
    throw new TypeError('1st argument should be an Object');
  }
  if (!def['default']) {
    throw new TypeError('Object is missing the "default" property');
  }
  if (!def['default'].name || typeof def['default'].name !== 'string') {
    throw new TypeError('"default" Object is missing the "name" String');
  }
}

/**
@private
@param {Array} array to test and return
@returns {Array} either the original or a new Object if obj was invalid
*/
function ensureArray (array) {
  if (Array.isArray(array)) {
    return array;
  }
  return [];
}

/**
@private
@param {Object} obj to test and return
@returns {Object} either the original or a new Object if obj was invalid
*/
function ensureObject (obj) {
  if (!obj || typeof obj !== 'object') {
    return {};
  }
  return obj;
}

/**
@typedef FlattenOptions
@type {Object}
@property {String[]} [nesting] properties within the default configuration
@property {String[]} [selection] properties within other configurations
*/

/**
 * @public
 * @param {Object} def original definition with multiple variations
 * @param {String} [variation] the specific variation desired
 * @param {FlattenOptions} [options] additional parameters
 * @return {Object} definition for a single variation
 */
function flattenDefinition (def, variation, options) {
  var nesting;
  var selection;
  var result = extend({}, def['default']);

  function flattenComponents (d) {
    var attrs = extend({}, d['default'] || {});
    if (variation && d[variation]) {
      extend(attrs, d[variation]);
    }

    return attrs;
  }

  typecheck(def);

  options = ensureObject(options);
  nesting = ensureArray(options.nesting);
  selection = ensureArray(options.selection);

  // found definition, but need to collapse nested definitions
  nesting.forEach(function (components) {
    if (Array.isArray(def['default'][components])) {
      result[components] = def['default'][components].map(flattenComponents);
    }
  });

  if (!variation) {
    // no further merging required
    return result;
  }

  if (def[variation]) {
    selection.forEach(function (select) {
      if (Array.isArray(def[variation][select])) {
        result[select] = sortAndFilterByName(
          result[select],
          def[variation][select]
        );
      }
    });
    extend(result, def[variation], selection);
  }

  return result;
}

module.exports = {
  flatten: flattenDefinition
};
