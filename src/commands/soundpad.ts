import Discord from "discord.js";
import path from "path";
import fs from "fs";

export default class {
	private ctx: Discord.Message;

	private audio: string | number;

	private audiosPath = "D:\\Soundpad\\.Sons";

	constructor(context: Discord.Message, audio: string | number) {
		this.ctx = context;
		this.audio = audio;
		if (audio === "list") {
			this.listAvailableAudios();
		} else if (audio) {
			this.playAudio();
		}
	}

	private async listAvailableAudios() {
		const files = fs.readdirSync(this.audiosPath);
		let embedList = new Discord.MessageEmbed();
		embedList.setTitle("Listando todos os áudios disponíveis");
		let listedItems = 0;
		for (const file of files) {
			if (true) {
				listedItems++;
				if (listedItems >= 24) {
					listedItems = 0;
					this.ctx.channel.send(embedList);
					embedList = null;
					embedList = new Discord.MessageEmbed();
					embedList.setTitle("Listando todos os áudios disponíveis");
				}
				embedList.addField(files.indexOf(file), file, false);
			}
		}
	}

	private async playAudio() {
		const connection = await this.ctx.guild.member(this.ctx.author).voice.channel.join();
		const playing = connection.play(
			path.join(this.audiosPath, fs.readdirSync(this.audiosPath)[Number(this.audio)])
		);
		playing.on("finish", () => {
			connection.channel.leave();
		});
	}
}
