require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.user,
		password: process.env.token
	},
	channels: [ 'powerplace09', 'bayfalcons21' ]
});


client.connect();

client.on('message', (channel, tags, message, self) => {
    
const isAdminMessage = tags.username == 'powerplace09' || 'meetyourmattch' || 'bayfalcons21'
const isSelfChannel  = channel == '#powerplace09'
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, hi!`);
	}
    if(message.toLowerCase() === '!cmds') {
		if(isSelfChannel){
		client.say(channel, `@${tags.username}, our current commands are: !hello, !play, !yt, !playing.`);
		}
		else {
			client.say(channel, `@${tags.username}, our current commands are: !hello, !playing.`);
		}
	}
    if(message.toLowerCase() === '!play' && isSelfChannel) {
		client.say(channel, `@${tags.username}, I play against my viewers! Just type your name in chat and my bot will save your name to a list for viewer days!`);
	}	
	if(message.toLowerCase() === '!playing') {
		client.say(channel, `@${tags.username}, he is currently streaming Rocket League.`);
	}
    if(message.toLowerCase() === '!yt' && isSelfChannel) {
		client.say(channel, `@${tags.username}, go check out Powerplace09's YouTube at https://www.youtube.com/@powerplace09!`);
	}
    if(message.toLowerCase() === '!secret' && isAdminMessage) {
		client.say(channel, `@${tags.username}, you've redeemed a secret, check your DMs!`);
	}
});