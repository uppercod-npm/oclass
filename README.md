## OClass

OClass facilitates the generation of layout, themes and prototypes, OSClass is autogenerative and configurable, the objectives of this library are:

1. Provide a solution to the definition of classes in a declarative and responsive way.
2. provide a self-healing class system.

```html
<script src="http://unpkg.com/oclass"></script>
<link
  rel="stylesheet"
  href="http://unpkg.com/oclass/css"
  data-config='{
      "colors":{
        "primary":"black",
        "secondary": "magenta"
      },
      "shadows":{
        "1":"0px 12px 22px black"
      },
      "radius":{
        "1": ".5rem"
      }
    }'
  onload="OClass(event.target)"
/>
```
