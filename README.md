# Anno

A toolkit for adding anno(tation) capabilities to anything. 

**Dependencies:** JQuery, JQuery UI

## Getting started

Include anno.js on your page.

Put whatever you want to annotate inside a div and create an instance of Anno pointed at the div.

```html
<div class="container">
    <img src="cat.jpg"/>
</div>

<script>
    var anno = new Anno('.container');
</script>
```