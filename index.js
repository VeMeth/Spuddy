const Discord = require("discord.js");
const client = new Discord.Client();
var dotenv = require("dotenv");
dotenv.load();
const token = process.env.token;
const spudchan = "spuds";

var rqplayers = "2";

// Set the prefix
const prefix = "!";




client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	client.user.setPresence({ game: { name: "SPUUUUD", type: 0 } });
});



// Commands
var spudders = [];
client.on("message" , (message) => {
	if(message.author.bot) return;
	if(message.content.indexOf(prefix) !== 0) return;
	console.log(message.channel);
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();



	// SIGNUP 
	if (command  === "spud" && message.channel.name == spudchan) {
	
		if (!spudders.includes(message.author)) {
			spudders.push(message.author);
			message.reply("You were signed up to a spud");
		}
		else {
			message.channel.send("You already signed up for this round");
		}
	
		console.log(spudders.length);
		if (spudders.length >= rqplayers ) {
			message.channel.send("SPUD IS RDY");
		}
	}
  
	//Waitinglist
	if (command  === "sup" && message.channel.name == spudchan) {
		var list = "";
		if (spudders.length == 0)
		{message.reply("Nobody is siged up yet");}
		else {
			for (var spud of spudders)  {
				list =  spud.username;
				console.log(spud);
				message.channel.send("\n" +spudders.length + "/" + rqplayers + " | " + list);
			}	  
		}

	} 
	// Set desired size of the game  
	if (command  === "ssize"  && message.channel.name == spudchan) {
		rqplayers = args[0];
		message.channel.send("Spud size set to: " + rqplayers);
	}
  


	if (command  === "test") {
		var author = message.author;
		message.reply("User ID: " + author.username + " Channel " + message.channel);

	}



});

client.login(token);