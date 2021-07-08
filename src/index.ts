/* eslint-disable no-case-declarations */
// utils
import ora from "ora";
import Discord from "discord.js";
import fs from "fs";
import path from "path";
import env from "./.env.json";

// commands
import Ban from "./commands/ban";
import SoundPad from "./commands/soundpad";
import Moan from "./commands/moan";
import Help from "./commands/help";
import Random from "./commands/random";
import RandomImage from "./commands/image";
import Shorten from "./commands/shorten";
import Question from "./commands/question";
import Ping from "./commands/ping";

const starting = ora("Iniciando");
starting.color = "green";
starting.start();

const prefix = env.PREFIX || "-";

const client = new Discord.Client();

client.on("ready", async () => {
	starting.succeed(`Bot iniciado como: ${client.user.tag}`);
	const activity = ora("Iniciando Atividade");
	activity.color = "red";
	activity.spinner = "arc";
	activity.start();

	await client.user.setActivity({ name: "$help", type: "WATCHING" });

	// const profilePics = fs.readdirSync(path.join(__dirname, "resources/profilePics/"));
	// const picture = profilePics[Math.floor(Math.random() * profilePics.length)];

	// await client.user.setAvatar(path.join(__dirname, `/resources/profilePics/${picture}`));
	activity.succeed("Atividade Iniciada");
});

// Commands
client.on("message", async (ctx: Discord.Message) => {
	if (ctx.author.username === client?.user?.username) return;
	if (!ctx.guild) {
		return ctx.channel.send("Eu só funciono em servidor otário");
	}

	if (ctx.content.startsWith(prefix)) {
		const args = ctx.content.slice(prefix.length).split(" ");
		try {
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
						if (args[2]) {
							new SoundPad(ctx, args[1], args[2]);
						}
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
				case "moan":
					Moan(ctx);
					break;
				case "random":
					new Random(ctx, args);
					break;
				case "say":
					let phrase = "";
					for (const wordIndex in args) {
						if (!(Number(wordIndex) === 0)) {
							phrase += ` ${args[wordIndex]}`;
						}
					}
					return ctx.delete().then(() => ctx.channel.send(phrase));
				case "image":
					let imgArgs = "";
					for (const wordIndex in args) {
						if (!(Number(wordIndex) === 0)) {
							imgArgs += ` ${args[wordIndex]}`;
						}
					}
					RandomImage(ctx, imgArgs, await client.users.fetch("444649908415234069"));
					break;
				case "shorten":
					Shorten(ctx, args[1], args[2] || "");
					break;
				case "gordao":
					return ctx.channel.send("Esse aqui: <@424619138741174275>? 🥐🥕🥗🥙🥚🥘🦐🌮🍣🍟🍔🌭🍿🍗🍩🍪🧀");
				case "question":
					let question = "";
					for (const wordIndex in args) {
						if (!(Number(wordIndex) === 0)) {
							question += ` ${args[wordIndex]}`;
						}
					}
					new Question(ctx, question);
					break;
				default:
					return ctx.channel.send(
						`Comando {${args[0]}} não encontrado... Quer que ele exista? Avise este otário aqui: <@444649908415234069> ou então mande aqui: <#858043195467235329>`
					);
			}
		} catch (error) {
			ctx.channel.send(`Não consegui realizar o comando... Avise a vagabunda disso aqui: ${error}`);
		}
	}
});

client.login(env.TOKEN);

export default client;
