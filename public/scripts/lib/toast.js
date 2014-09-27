/*

TODO:
====
-	Make Cheezy Toast.
-	Prepare proper code block examples.
- 	Style the home page.
-	Add option to display toast at the top and bottom.
-	Likewise, add option to show it sideways as well.
-	Clean up global variables, wherever possible.
-	Testing on various platforms.
-	DONE	Manage multiple toast execution.
-	DONE	Clear all the TODOs.
-	DONE	Resolve overlapping style problems. (Click Timed Toast, Styled toast and Timed Toast again.)

IDEAS:
=====
-	More use cases to be thought of.(error handling, Welcome Messages, Touring helpers, Validation responses, status updates)
-	More templates can be added on the top(like procedures which are hardcoded to run the same way).
-	Toast selectors can also made so that the various toasts are handled by the script itself.
-	(Think about)/(Test the) responsiveness of the Toast.
-	Can textboxes and other stuff be added too? That would mean, that it's the real replacement for alert boxes.
-	Should the toasts be allowed to move as well? That would make it like stick-its(Task list) kind of thing.
*/


/**
	This is the queue data structure.
**/
var queue = [];

/**
	Default delay value.
**/
var default_delay = 3000;

/**
	Default id handle.
**/
var default_id_handle = "#kamehameha_toast";

/**
	This dict is used to set the default style of the dictionary.
**/
var default_style_dict=	
{
    "font-size": "15px",
    "color": "#FFF",
    "margin-left": "auto",
    "padding": "10px 10px",
    "margin-right": "auto",
    "max-width": "40%",
    "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
    "display": "none",
    "background-color": "#000",
    "background-color": "rgba(0,0,0,0.8)",
    "text-align": "center"
};

/**
	()	->	None
	Initialising the elements that should be in the Toast.
	Basically appends a div in the body with the predined style.
**/
function initialise_toast(){
	element = "\
	<div style=	\"\
					position:fixed;\
					width:100%;\
					bottom:2%;\
					text-align:center;\
				\"\
	>\
		<div id=\"kamehameha_toast\"></div>\
	</div>";
	$("body").append(element);
}

/**
	(string, *{...}) -> None
	Takes the string that is to be displayed and optional argument.
	The optional argument can contain delay information and styling details.
	eg : {"delay":3000, "padding":"30px"}
	This function shows a message for a short period of time bottom of the browser.
	Can be used for debugging, or in general giving some failure messages.
**/	
function toast(toast_str, opt_args){
	if(typeof toast_str === "undefined"){
		log_e("Needs string as parameter.");
		return;
	}
	var id_handle = default_id_handle;

	var delay = default_delay;

	//Shallow copy is required.
	var style_dict = JSON.parse(JSON.stringify(default_style_dict));

	if(typeof opt_args  !== "undefined"){
		for(key in opt_args){
			if(key != "delay"){
				style_dict[key] = opt_args[key];
			}else{
				if(isNaN(opt_args[key]) === false){
					delay = parseInt(opt_args[key]);
				}
			}
		}
	}

	queue_params = {
		"id_handle"	: 	id_handle,
		"toast_str"	: 	toast_str,
		"style_dict": 	style_dict,
		"delay" 	: 	delay,
		"speed"		: 	"slow"
	};

	//add params to queue.
	add_to_queue(queue_params);
}

/**
	({...})	->	None
	This adds the queue_params to the queue, and proceeds to queue processing.
**/
function add_to_queue(queue_params){
	if(typeof queue_params === "undefined"){
		//log an error here.
		return;
	}
	queue.unshift(queue_params);
	log_e(JSON.stringify(queue));
	if(queue.length == 1){
		queue_processing();
	}
}

/**
	(*{...})	->	None
	The actual display logic is here.
	Takes care of popping the queue, and displaying the content.
**/
function queue_processing(first_time){
	if(typeof first_time === "undefined"){
		first_time = true;
	}
	if(queue.length == 0){
		log_e("Nothing to display");
		return;
	}
	if(queue.length != 1){
		queue.pop();
	}else{
		if(first_time){
			first_time = false;
		}else{
			first_time = true;
			queue.pop();
			return;
		}
	}
	display_dict = queue[queue.length - 1];
	log_e("printing -- " + JSON.stringify(display_dict));

	$(display_dict["id_handle"]).removeAttr("style").text(display_dict["toast_str"]).css(display_dict["style_dict"]).fadeIn(display_dict["speed"]).delay(display_dict["delay"]).fadeOut(display_dict["speed"], function(){queue_processing(first_time);});
}

/**
	({...})	->	None
	Sets the default values as specified in the arguments.
**/
function set_default(args){
	if(typeof args === "undefined"){
		return;
	}
	for(key in args){
		if(key == "delay"){
			if(isNaN(args[key]) === false){
				default_delay = args[key];
			}
		}else{
			default_style_dict[key] = args[key];
		}
	}
}

/**
	(string)	->	None
	Logging function
**/
function log_e(str){
	console.log(str);
}

/**
	Initialising the Toast.
**/
$(document).ready(initialise_toast);