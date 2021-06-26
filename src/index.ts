/* eslint-disable no-case-declarations */
// Your code starts here!
// utils
import ora from "ora";
import Discord from "discord.js";
import env from "./.env.json";

// discord

// commands
import Ban from "./commands/ban";
import SoundPad from "./commands/soundpad";
import Help from "./commands/help";
import Ping from "./commands/ping";

const starting = ora("Iniciando").start();

const prefix = env.PREFIX || "-";

const client = new Discord.Client();

client.on("ready", () => {
	starting.succeed(`Bot iniciado como: ${client?.user?.username}`);
});

// Commands
client.on("message", (ctx: Discord.Message) => {
	if (ctx.author.username === client?.user?.username) return;
	if (!ctx.guild) {
		return ctx.channel.send("Eu só funciono em servidor otário");
	}

	if (ctx.content.startsWith(prefix)) {
		const args = ctx.content.slice(prefix.length).split(" ");
		switch (args[0]) {
			case "ban":
				new Ban(ctx, args[1]);
				break;
			case "ultraban":
				if (args[2]) {
					new Ban(ctx, args[1], args[2]);
				} else {
					new Ban(ctx, args[1], "randomthingjusttogiveanerror");
				}
				break;
			case "soundpad":
				if (args[1]) {
					new SoundPad(ctx, args[1]);
				} else {
					new SoundPad(ctx, "list");
				}
				break;
			case "help":
				Help(ctx);
				break;
			case "ping":
				Ping(ctx);
				break;
			case "say":
				let phrase = "";
				for (const wordIndex in args) {
					if (!(Number(wordIndex) === 0)) {
						phrase += ` ${args[wordIndex]}`;
					}
				}
				ctx.delete().then(() => ctx.channel.send(phrase));
				break;
			default:
				break;
		}
	}
});

client.login(env.TOKEN);

export default client;
