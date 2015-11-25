var sock;
var msgcontainer;

var host='localhost';

function SamuInit() {
	msgcontainer = $("#chatarea");
	if("WebSocket" in window){
		var state = $("section#state span");
		var send = $("input#send");
		sock = new WebSocket('ws://'+host+':7268');
		sock.onopen = function(){
			state.html("Now you can talk to Samu.");
			send.prop("disabled",false);

		}
		sock.onmessage = function(evt){
			msgcontainer_append(evt.data, "Amminadab");
		}

		sock.onclose = function(){
			state.html("Connection lost. Refresh your browser!");
			send.prop("disabled",true);
		}

	}else{
		state.html("Your browser is not supported. Please update your browser for HTML5 support!");
	}

}

function sendmsg(msg){
	sock.send(msg);
	msgcontainer_append(msg, "You");
}


function msgcontainer_append(msg, sender, color){
	
	var msgDiv = $("<div>");
	msgDiv.attr('id',"message").addClass((sender=='Amminadab')?"samu":"client").html(sender + ":<br>" + msg).appendTo(msgcontainer);
	$("<div>").addClass("clear").appendTo(msgcontainer);
	
	var scrll = $("#chatarea");
	scrll.animate({ scrollTop: scrll[0].scrollHeight}, 25);

}

function msg_send_clicked(){
	var txtinput =  $("input#mess_input");
	if(txtinput.val() != "")
		sendmsg(txtinput.val());
	txtinput.val("");
}
