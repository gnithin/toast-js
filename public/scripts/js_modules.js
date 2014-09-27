/**
	Initialisation.
*/
$(document).ready(main);

/**
	This is the function that will be called for the first time in every page.
*/
function main(){
	toast("This is a demonstration of how Toast Works!",{"delay": 3000});
	var id_params_dict = {
		"default-toast"	: 	{
								"toast_str"	: 	"This is the default Toast",
								"opt_args"	: 	{}
							},
		"timed-toast"	: 	{
								"toast_str"	: 	"This is a timed Toast with 4000ms delay",
								"opt_args"	: 	{"delay": 5000}
							},
		"styled-toast"	: 	{
								"toast_str"	: 	"This is a styled Toast.",
								"opt_args"	: 	{
													"background-color"	: 	"#00F",
													"border" 			: 	"5px dashed #F00",
													"color" 			: 	"#0F0",
													"font-family"		: 	"monospace",
													"font-size"			: 	"30px"
												}
							}

	};
	for(id in id_params_dict){
		params = id_params_dict[id];
		$("#" + id).bind("click",params,function(event){
			var params = event.data;
			toast(params['toast_str'], params['opt_args']);
		})
	}

	$("#set-default-toast").bind("click", function(){
		default_vals = {
			"background-color"	: 	"#00F",
			"border" 			: 	"5px dashed #F00",
			"color" 			: 	"#0F0",
			"font-family"		: 	"Helvitica",
			"font-size"			: 	"30px"

		};
		set_default(default_vals);
		toast("This is the new default Toast.");
	});
}