var sock;
var msgcontainer;

function SamuInit() {
	msgcontainer = document.getElementById('chatarea');
	if("WebSocket" in window){
		sock = new WebSocket('ws://localhost:7268');
		sock.onopen = function(){
			msgcontainer_append("Now you can talk to Samu.", "white");
			document.getElementById('send').disabled=false;
			
		}
		sock.onmessage = function(evt){
			msgcontainer_append(evt.data, "green");
		}
		
		sock.onclose = function(){
			msgcontainer_append("Connection lost. Refresh your browser!", "red");
			document.getElementById('send').disabled=true;
		}
		
	}else{
		msgcontainer_append("Your browser is not supported. Get firefox, edge or chrome!", "red");
	}
	
}

function sendmsg(msg){
	sock.send(msg);
	msgcontainer_append(msg, 'blue');
}


function msgcontainer_append(msg, color){
	var msgdiv = document.createElement('div');
	msgdiv.style = "color: "+ color + ";";
	msgdiv.innerHTML = msg;
	msgcontainer.appendChild(msgdiv);
	document.getElementById('message').focus();
	var scrll= document.getElementById('scrt');
	scrll.scrollTop=scrll.scrollHeight;
}

function msg_send_clicked(){
	var txtinput = document.getElementById('message');
	if(txtinput.value != "")
		sendmsg(txtinput.value);
	txtinput.value = "";
}
