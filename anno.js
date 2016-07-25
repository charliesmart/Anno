var Anno = function(container) {
    this.config = {
	container: $(container),
	tools: '',
	currentTool: '',
	labels: 'anno--label',
	editMode: true,
    }
    console.log(this.config.container);
    this.bindUIActions();
    return this;
}

// --------------------------------------------------
// Generic function for setting and getting config
// values
// --------------------------------------------------
Anno.prototype.setting = function(setting, value) {
    if (typeof value == undefined) {
	return this.config[setting];
    } else {
	this.config[setting] = value;
	return this;
    }
}

// --------------------------------------------------
// 

// --------------------------------------------------
// Sets and gets of tools
// --------------------------------------------------
Anno.prototype.tools = function(tools) {
    return this.setting('tools', $(tools));
}

// --------------------------------------------------
// Sets and gets current tool
// --------------------------------------------------
Anno.prototype.currentTool = function(currentTool) {
    return this.setting('currentTool', currentTool);
}

// --------------------------------------------------
// Sets and gets edit mode
// --------------------------------------------------
Anno.prototype.editMode = function(editMode) {
    this.setting('editMode', editMode);
}

// --------------------------------------------------
// Sets up event listeners and responses for UI actions
// --------------------------------------------------
Anno.prototype.bindUIActions = function() {
    var that = this;
    console.log('binding');
    // Listens for user clicking on toolbar items
    this.config.container.on('click', function(e) {
	e.preventDefault;
	console.log('click');
	// Prevent clicks on labels from bubbling and creating new labels
	if (e.target != this) return false;
	that.addText(e);
    });

    // If a user leaves an empty label, just delete it
    $(document).on('blur','.' +  this.config.labels, function(e) {
	e.preventDefault;
	console.log('blur');
	that.killEmptyLabels();
    });
}

// --------------------------------------------------
// Appends and positions empty texteditable div
// --------------------------------------------------
Anno.prototype.addText = function(e) {
    if (this.config.editMode) {
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
    }
    content.focus();
}

// --------------------------------------------------
// Finds empty labels and kills them a la Liam Neeson
// in Taken. (Actually by searching for classes.)
// --------------------------------------------------
Anno.prototype.killEmptyLabels = function() {
    console.log('Killing labels...');
    console.log(this.config.labels);
    
    $('.' + this.config.labels).each(function(i, e) {
	var text = $(e).text();
	console.log(text);
	if (text == '') $(e).remove(); 
    })
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



