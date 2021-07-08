import Discord from "discord.js";

function Ping(ctx: Discord.Message) {
	let startTime: any;
	let endTime: any;

	function start() {
		startTime = new Date();
	}

	function end(message: Discord.Message) {
		endTime = new Date();
		const timeDiff = endTime - startTime; // in ms
		// strip the ms
		// timeDiff /= 1000;

		// get seconds
		const ms = Math.round(timeDiff);
		message.edit(`Pong! 🏓, ${ms} milissegundos!`);
	}
	start();
	ctx.channel.send("Pong! 🏓").then((message) => {
		end(message);
	});
}

export default Ping;
