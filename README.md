# OClass

OClass facilitates the generation of layout, themes and prototypes, OSClass is autogenerative and configurable, the objectives of this library are:

1. Provide a solution to the definition of classes in a declarative and responsive way.
2. provide a self-healing class system.

## Example

```html
<script src="http://unpkg.com/oclass"></script>
<style
  onload="OClass(event.target,{
      colors:{
        primary:'black',
        secondary: 'magenta'
      }
  }"
>
  .color\.--colors {
    color: var(--colors);
  }
  .bgcolor\.--colors {
    background-color: var(--colors);
  }
</style>
<button class="bgcolor.primary">Primary</button>
```

¿Que ha sucedido? OClass ha creado las clases `bgcolor.primary`, estas clase se ha generado
segun el patron enseñado dentro del tag `<style>`, en el que el prefijo `--colors` sera remplazado por cada item dentro de la propiedad `colors`.

## Ejemplo de configuracion de class-utils

```json
{
  "cols": {
    "2": 2,
    "4": 4,
    "6": 6,
    "8": 8
  },
  "span": {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8
  },
  "sizes": {
    "1": "8px",
    "2": "16px",
    "3": "20px",
    "4": "28px",
    "5": "32px",
    "6": "44px",
    "7": "60px"
  },
  "media": {
    "xl": "(min-width: 1280px)",
    "l": "(min-width: 1024px)",
    "m": "(min-width: 768px)",
    "s": "(min-width: 640px)"
  },
  "weight": {
    "light": 300,
    "regular": 400,
    "medium": 500,
    "bold": 700,
    "black": 900
  },
  "content": {
    "start": "start",
    "end": "end",
    "stretch": "stretch",
    "between": "space-between",
    "around": "space-around",
    "evenly": "space-evenly",
    "center": "center"
  },
  "fit": {
    "cover": "cover",
    "contain": "contain"
  },
  "dir": {
    "col": "columns",
    "row": "row"
  },
  "textAlign": {
    "left": "left",
    "right": "right",
    "center": "center"
  }
}
```
