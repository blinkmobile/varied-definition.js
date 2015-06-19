# Nested Definitions


## What is a "nesting property"?

For certain use cases, you may want to store a configuration that covers a
parent item and its children. To represent this, properties within a
configuration can have an Array property, containing zero or more child
definitions.

Always declare nesting properties and their full contents within the default
configuration. Further, child configurations must have unique names.

For example, where "friends" is a nesting property ...

```json
{
  "default": {
    "name": "Harry",
    "friends": [
      {
        "default": {
          "name": "Hermione"
        }
      },
      {
        "default": {
          "name": "Ronald"
        }
      }
    ]
  }
}
```

... has a final "default" configuration ...

```json
{
  "name": "Harry",
  "friends": [
    {
      "name": "Hermione"
    },
    {
      "name": "Ronald"
    }
  ]
}
```


## What is a "selection property"?

For certain use cases that use nested properties, you may want to declare a
configuration that results in a subset of the children found in the default
configuration. You may also wish to re-order the children, based on the
variation.

Selection properties must match the name of the nesting property that they
filter. Selection properties are Arrays of Strings, where the Strings refer to
the nested configuration by name.

This allows variations to re-order and filter the child configurations without
needlessly duplicating them.

For example, re-using the above "default" configuration ...

```json
{
  "default": { },
  "h-names": {
    "friends": [
      "Hermione"
    ]
  }
}
```

... has a final "h-names" configuration ...

```json
{
  "name": "Harry",
  "friends": [
    {
      "name": "Hermione"
    }
  ]
}
```
