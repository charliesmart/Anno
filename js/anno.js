/****************************************************

     Anno
     A library for making anno(tation) generators.
     by Charlie Smart
     charlie.r.smart@gmail.com

*****************************************************/

var Anno = function(container) {
    this.config = {
	container: $(container),
	toolbar: [],
	currentTool: '',
	labels: 'anno--label',
	mode: 'text',
    }
    
    this.bindUIActions();
    return this;
}

// --------------------------------------------------
// Generic function for setting and getting config
// values
// --------------------------------------------------
Anno.prototype.setting = function(setting, value) {
    if (value == null) {
	return this.config[setting];
    } else {
	this.config[setting] = value;
	return this;
    }
}

// --------------------------------------------------
// Sets and gets of tools
// --------------------------------------------------
Anno.prototype.toolbar = function(toolbar) {
    return this.setting('toolbar', $(toolbar));
}

// --------------------------------------------------
// Sets and gets current tool
// --------------------------------------------------
Anno.prototype.tool = function(currentTool) {
    return this.setting('currentTool', currentTool);
}

// --------------------------------------------------
// Sets and gets container
// --------------------------------------------------
Anno.prototype.container = function(container) {
    return this.setting('container', $(container));
}

// --------------------------------------------------
// Sets and gets edit mode
// --------------------------------------------------
Anno.prototype.mode = function(newMode) {
    if (newMode) this.modeSwitch(newMode);
    return this.setting('mode', newMode);
}

// --------------------------------------------------
// Changes contenteditable status when in move mode
// --------------------------------------------------
Anno.prototype.modeSwitch = function(mode) {
    if (mode == 'move') {
	this.moveStart();
    } else {
	this.moveStop();
    }
}

Anno.prototype.generateTools = function(tools, toolClass, fill="icon") {
    var toolbar = this.config.toolbar;
    
    for (var i = 0; i < tools.length; i++) {
	toolbar.append('<button data-func="' + tools[i] +
		       '" class="' + toolClass +
		       '"></button>');
    }
}

// --------------------------------------------------
// Sets up event listeners and responses for UI actions
// --------------------------------------------------
Anno.prototype.bindUIActions = function() {
    var that = this;
    
    // Listens for clicks on container
    this.config.container.on('click', function(e) {
	e.preventDefault;
	
	// Prevent clicks on labels from bubbling and creating new labels
	if (e.target != this) return false;
	that.addText(e);
    });

    // If a user leaves an empty label, just delete it
    $(document).on('blur','.' +  this.config.labels, function(e) {
	e.preventDefault;
	
	that.killEmptyLabels();
    });
}

// --------------------------------------------------
// Appends and positions empty texteditable div
// --------------------------------------------------
Anno.prototype.addText = function(e) {
    if (this.mode() == 'text') {
	var mouseX = e.pageX,
	    mouseY = e.pageY,
	    offsetX = this.config.container.offset().left,
	    offsetY = this.config.container.offset().top,
	    containerWidth = this.config.container.width(),
	    containerHeight = this.config.container.height();

	var positionLeft = (mouseX - offsetX) / containerWidth * 100,
	    positionTop = (mouseY - offsetY) / containerHeight * 100;
	
	var content = document.createElement('div');
	content.className = this.config.labels;
	content.fontFamily = 'sans-serif';
	content.style.position = 'absolute';
	content.contentEditable = 'true';
	content.style.top = positionTop + '%';
	content.style.left = positionLeft + '%';
	this.config.container.append(content);

	content.focus();
    }

}

// --------------------------------------------------
// Finds empty labels and kills them a la Liam Neeson
// in Taken. (Actually by searching for classes.)
// --------------------------------------------------
Anno.prototype.killEmptyLabels = function() {
    
    $('.' + this.config.labels).each(function(i, e) {
	var text = $(e).text();
	
	if (text == '') $(e).remove(); 
    });
}

// --------------------------------------------------
// Main function for repositioning labels
// --------------------------------------------------
Anno.prototype.moveStart = function() {

    $('.anno--label').attr('contenteditable', 'false')
	.css('cursor', 'move');
    
    // Start draggable on elements
    $('.anno--label').draggable({
	disabled: false,
	cursor: 'move',
	stop: function() {
	    var left = parseInt($(this).css('left')),
		top = parseInt($(this).css('top')),
		width = parseInt($(this).parent().width()),
		height = parseInt($(this).parent().height());
	    $(this).css('left', left / width * 100 + '%');
	    $(this).css('top', top / height * 100 + '%');
	}
    })
}


// --------------------------------------------------
// Shut off draggable when we're done with it
// --------------------------------------------------
Anno.prototype.moveStop = function() {
    $('.anno--label').attr('contenteditable', 'true')
	    .css('cursor', 'text');
    $('.anno--label').draggable('destroy');
}

// --------------------------------------------------
// Gets the HTML for the final labels
// --------------------------------------------------
Anno.prototype.getHTML = function() {

    // Get the inner HTML
    var html = this.config.container.html();

    // Strip out contenteditable tags because we don't
    // want users editing the content
    html = html.split(' ');
    html = html.map(function(attr){
	if (attr.startsWith('contenteditable=')) return '';
	return attr;
    });
    
    return html.join(' ');
}

// // --------------------------------------------------
// // Registers click on tool, sets current tool, and
// // activates tool method
// // --------------------------------------------------
// Anno.prototype.toolClick = function(toolElement, e) {
//     e.preventDefault();

//     var tool = $(toolElement).data('func');

//     this.currentTool(tool);
//     this.useTool();

//     return this;
// }

// // --------------------------------------------------
// // Takes the current tool and performs an action
// // --------------------------------------------------
// Anno.prototype.useTool() {
//     var currentTool = this.config.currentTool;
    
//     // Check if event is a simple click (i.e. not a dropdown or text field)
//     if (currentTool == 'createLink') {
// 	this.addLink();
//     } else if (currentTool = 'move') {
// 	this.move();
//     } else {
// 	console.error(currentTool + ' is not a valid tool.');
//     }

//     return this;
// }

// // --------------------------------------------------
// // Makes changes to text with basic tools that only
// // involve a single click
// // --------------------------------------------------
// Anno.prototype.basicTool = function() {
//     this.config.tools.unbind('click');
//     document.execCommand(basicTool, false);
//}
