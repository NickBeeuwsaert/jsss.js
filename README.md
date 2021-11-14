# JavaScript StyleSheets (JSSS.JS)

Why use CSS-in-JS when you can use [JSSS](https://en.wikipedia.org/wiki/JavaScript_Style_Sheets)?

## Using

For some reason, I can't imagine why, Javascript in strict mode, which includes ESM modules, doesn't allow the `with` statement. Weird, right?. Anyway, to work around this "bug" <!-- I know its not a bug, don't @ me -->, you can use a transpiler, like [esbuild](https://esbuild.github.io/):

```sh
esbuild --format=iife --global-name=jsss --bundle jsss.js --outfile=jsss.bundle.js
```

And then to use:

```html
<script src="./jsss.bundle.js"></script>
<script>
  const { tags, classes, ids, contextual } = jsss;

  // Set the background to red
  with (tags.body) {
    backgroundColor = "red";
  }

  // All classes with the className 'cool' have green text
  with (classes.cool.all) {
    color = "green";
  }

  // Except p tags, those are blue
  with (classes.cool.p) {
    color = "blue";
  }

  // All elements with class "item" which are in the element with id "container"
  with (contextual(ids.container, classes.item.all)) {
    display = "none";
  }
</script>
```

Et voilà, you have a _beautifully_ styled document

<!-- in case you didn't get it, this is a joke. -->
