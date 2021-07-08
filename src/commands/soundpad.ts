import Discord from "discord.js";
import path from "path";
import fs from "fs";

export default class {
	private ctx: Discord.Message;

	private audio: string | number;

	private volume: string | number;

	private audiosPath = "D:\\Soundpad\\.Sons";

	constructor(context: Discord.Message, audio: string | number, volume: string | number = 0) {
		this.ctx = context;
		this.audio = audio;
		this.volume = volume;
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
		try {
			const connection = await this.ctx.guild.member(this.ctx.author).voice.channel.join();
			const playing = connection.play(
				path.join(this.audiosPath, fs.readdirSync(this.audiosPath)[Number(this.audio)])
			);
			if (!(this.volume === 0 || this.volume === "0")) {
				playing.setVolume(Number(this.volume));
			}
			playing.on("finish", () => {
				connection.channel.leave();
			});
		} catch (err) {
			return this.ctx.channel.send(`Não consegui tocar o áudio 🙁. Avise a vagabunda desse erro: ${err}`);
		}
	}
}
