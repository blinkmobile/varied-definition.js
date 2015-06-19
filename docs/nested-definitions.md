# Nested Definitions

For certain use cases, you may want to store a configuration that covers a
parent item and its children. To represent this, properties within a
configuration can have an Array property, containing zero or more child
definitions.

For example:

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
