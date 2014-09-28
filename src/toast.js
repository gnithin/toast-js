/***********************************
TODO:
====
-   Make Cheezy Toast.
-   Prepare proper code block examples.
-   Style the home page.
-   Clean up global variables, wherever possible.
-   Testing on various platforms.
-   DONE    Error logging on console.
-   DONE    Add option to display toast at the top and bottom.
-   DONE    Manage multiple toast execution.
-   DONE    Resolve overlapping style problems. (Click Timed Toast, Styled toast and Timed Toast again.)
-   DONE    Clear all the TODOs.

IDEAS:
=====
-   More use cases to be thought of.(error handling, Welcome Messages, Touring helpers, Validation responses, status updates)
-   More templates can be added on the top(like procedures which are hardcoded to run the same way).
-   Toast selectors can also made so that the various toasts are handled by the script itself.
-   (Think about)/(Test the) responsiveness of the Toast.
-   Can textboxes and other stuff be added too? That would mean, that it's the real replacement for alert boxes.
-   Should the toasts be allowed to move as well? That would make it like stick-its(Task list) kind of thing.
***********************************/

/**
    This is the queue data structure.
**/
var queue = [];

/**
    Default delay value.
**/
var default_delay = 3000;

/**
    Default id handles.
**/
var default_id = "kamehameha_toast";
var default_id_handle = "#" + default_id;
var default_wrapper_id = "kamehameha_wrapper";
var default_wrapper_id_handle = "#" + default_wrapper_id;

/**
    This dict is used to set the default style of the dictionary.
**/
var default_toast_style_dict =
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

var default_wrapper_style_dict = 
{
    "position" : "fixed",
    "width" : "100%",
    "bottom" : "2%",
    "text-align" : "center"
};

/**
    ()  ->  None
    Initialising the elements that should be in the Toast.
    Basically appends a div in the body with the predined style.
**/
function initialise_toast(){
    element = "<div id=\"" + default_wrapper_id + "\"><div id=\"" + default_id + "\"></div></div>";
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
        log_e("Toast display string needs to be passed as parameter.");
        return;
    }
    var id_handle = default_id_handle;
    var wrapper_id_handle = default_wrapper_id_handle;

    var delay = default_delay;

    //Shallow copy is required.
    var style_dict = JSON.parse(JSON.stringify(default_toast_style_dict));
    var wrapper_style_dict = JSON.parse(JSON.stringify(default_wrapper_style_dict));


    if(typeof opt_args  !== "undefined"){
        populate_style_values(opt_args, delay, wrapper_style_dict, style_dict);
    }

    queue_params = {
        "id_handle" :   id_handle,
        "wrapper_id_handle" : wrapper_id_handle,
        "toast_str" :   toast_str,
        "style_dict":   style_dict,
        "wrapper_style_dict" : wrapper_style_dict,
        "delay"     :   delay,
        "speed"     :   "slow"
    };

    //add params to queue.
    add_to_queue(queue_params);
}

/**
    ({...}) ->  None
    This adds the queue_params to the queue, and proceeds to queue processing.
**/
function add_to_queue(queue_params){
    if(typeof queue_params === "undefined"){
        log_e("Queue needs parameters to be logged.");
        return;
    }
    queue.unshift(queue_params);
    log(JSON.stringify(queue));
    if(queue.length == 1){
        queue_processing();
    }
}

/**
    (*{...})    ->  None
    The actual display logic is here.
    Takes care of popping the queue, and displaying the content.
**/
function queue_processing(first_time){
    if(typeof first_time === "undefined"){
        first_time = true;
    }
    if(queue.length == 0){
        log("Nothing to display");
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
    log("printing -- " + JSON.stringify(display_dict));

    $(display_dict["wrapper_id_handle"]).removeAttr("style").css(display_dict['wrapper_style_dict']);
    $(display_dict["id_handle"]).removeAttr("style").text(display_dict["toast_str"]).css(display_dict["style_dict"]).fadeIn(display_dict["speed"]).delay(display_dict["delay"]).fadeOut(display_dict["speed"], function(){queue_processing(first_time);});
}

/**
    ({...}) ->  None
    Sets the default values as specified in the arguments.
**/
function set_default(args){
    if(typeof args === "undefined"){
        return;
    }
    populate_style_values(args, default_delay, default_wrapper_style_dict, default_toast_style_dict);
}

function populate_style_values(args, delay_var, wrapper_style_dict, toast_style_dict){
    for(key in args){
        switch(key){
            case "delay"    :   
                                if(isNaN(args[key]) === false){
                                    delay_var = args[key];
                                }
                                break;
            case "toast-pos" :
                                switch(args[key]){
                                    case "top"   :   
                                                delete wrapper_style_dict['top'];
                                                delete wrapper_style_dict['bottom'];
                                                wrapper_style_dict['top'] = "2%";
                                                break;
                                    case "bottom":
                                                delete wrapper_style_dict['top'];
                                                delete wrapper_style_dict['bottom'];
                                                wrapper_style_dict['bottom'] = "2%";
                                                break;
                                };
                                break;
            default         :
                                toast_style_dict[key] = args[key];
                                break;
        };
    }
}


/**
    (string)    ->  None
    Logging function
**/
function log(str){
    if(console){
        console.log(str);
    }
}

/**
    (string)    ->  None
    Error logging function
**/
function log_e(str){
    if(console){
        console.error(str);
    }
}

/**
    Initialising the Toast.
**/
$(document).ready(initialise_toast);