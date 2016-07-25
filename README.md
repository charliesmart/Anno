# Anno

A toolkit for adding anno(tation) capabilities to anything. 

**Dependencies:** JQuery, JQuery UI

## Contents

* [Getting Started](#gettingstarted)
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
4. Set up a toolbar. Each button should have a `'data-func'` attribute containing a tool. A list of tools is provided [here](#).

   ```html
   <div id="toolbar">
   	<button data-func="bold">Bold</button>
	<button data-func="itallic">Itallic</button>
	<!-- ... -->
   </div>
   ```