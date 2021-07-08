import Discord from "discord.js";
import path from "path";
import fs from "fs";

export default class {
	private ctx: Discord.Message;

	private args: any;

	constructor(context: Discord.Message, args: string[]) {
		this.ctx = context;
		args.shift();
		this.args = args;
		this.chooseRandom();
	}

	private chooseRandom() {
		this.ctx.channel.send("Estou escolhendo ...");
		this.ctx.channel.send(this.args[Math.floor(Math.random() * this.args.length)]);
	}
}
