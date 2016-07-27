# Anno

A toolkit for adding anno(tation) capabilities to anything. 

**Dependencies:** JQuery, JQuery UI

## Contents

* [Getting Started](#getting-started)
* [API](#api)

## Getting started

1. Include anno.js on your page.

2. Create a div and put whatever you want to annotate inside of it.

   ```html
   <div class="container">
   	<!--Put your image, SVG, etc here. Make sure it's fills the div.-->
   </div>
   ```

3. Create an instance of Anno pointed at your container. 

   ```javascript
   var anno = new Anno('.container');
   ```
4. Create a div to hold your toolbar.

   ```html
   <div id="toolbar"></div>
   ```

To be continued...

## API

[#](#) anno.**container**([container])

Change the annotation container or return the annotation container.

```javascript
// Sets new container
anno.conatiner('#new-container');

// Gets current container
anno.container();
// return: Container JQuery object
```

[#](#) anno.**mode**([mode])

Sets mode or gets current mode. Possible modes are `'text'` and `'move'`.

```javascript
// Sets mode to 'move'
anno.mode('move');

// Gets current mode
anno.mode();
```



