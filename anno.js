var Anno = (function(){
    var make = {};

    var _config = {
	container: '',
	toolsClass: '',
	currentTool: '',
	editMode: true,
    }

    // --------------------------------------------------
    // Initializes the library on an element
    // --------------------------------------------------
    make.init = function(container, tools) {
	_setContainer(container);
	_setToolsClass(tools);
	_bindUIActions();
    }

    // --------------------------------------------------
    // Sets the container or returns current container
    // --------------------------------------------------
    var _setContainer = function(container){
	_config.container = $(container);
    }

    // --------------------------------------------------
    // Sets the class of the tool items
    // --------------------------------------------------
    var _setToolsClass = function(toolsClass) {
	_config.toolsClass = $(toolsClass);
    }

    // --------------------------------------------------
    // Sets up events listeners for UI actions
    // --------------------------------------------------
    var _bindUIActions = function() {
	
    }

    // --------------------------------------------------
    // Sets the current tool or returns current tool
    // --------------------------------------------------
    make.tool = function(tool) {
	//Setter if argument is given, getter if not
	if (arguments.length > 0) {
	    _config.curentTool = tool;
	} else {
	    return _config.currentTool;
	}
    }
    
    return gen;
}())



