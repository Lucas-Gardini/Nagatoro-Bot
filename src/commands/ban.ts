import Discord from "discord.js";
import path from "path";

export default class {
	private ctx: Discord.Message;

	private user: string;

	private userId: string;

	private banChannel: string | Discord.GuildChannel;

	constructor(context: Discord.Message, user: string, banChannel: string = null) {
		this.ctx = context;
		this.user = user;
		[this.userId] = this.user.toString().split("!")[1].split(">");
		this.banChannel = banChannel;

		if (!banChannel) {
			this.Ban();
		} else {
			this.UltraBan();
		}
	}

	private async Ban() {
		const { channel } = this.ctx.guild.member(this.userId).voice;

		const connection = await channel.join();

		const playing = await connection.play(path.join(__dirname, "../resources/banido.mp3"));
		playing.on("finish", async () => {
			await this.ctx.guild.member(this.userId).voice.setChannel(null);
			await connection.disconnect();
		});

		return this.ctx.channel.send(`Ednaldo Pereira está banindo: ${this.user}`);
	}

	private async UltraBan() {
		try {
			const { channel } = this.ctx.guild.member(this.userId).voice;

			const connection = await channel.join();

			const oldChannel: Discord.VoiceChannel = this.ctx.guild.member(this.userId).voice.channel;

			let currentChannel = 0;
			let canContinue = false;

			this.ctx.guild.channels.cache.map((guildChannel) => {
				if (guildChannel.name === this.banChannel) {
					canContinue = true;
					this.banChannel = guildChannel;
				}
			});

			let playing;
			if (canContinue) {
				playing = await connection.play(path.join(__dirname, "../resources/banidodesbanido.mp3"));
			} else {
				playing = await connection.play(path.join(__dirname, "../resources/mencionaocanal.mp3"));
				playing.setVolume(500);
				playing.on("finish", () => {
					connection.disconnect();
				});
				return;
			}

			let banned = 0;
			setTimeout(() => {
				const banInterval = setInterval(async () => {
					banned++;
					if (banned > 10) {
						clearInterval(banInterval);
					}
					if (currentChannel === 0) {
						await this.ctx.guild
							.member(this.userId)
							.voice.setChannel(this.banChannel)
							.catch(() => {
								banned = 11;
								connection.disconnect();
								return this.ctx.channel.send(`Ednaldo Pereira não conseguiu banir o ${this.user}.`);
							});
						currentChannel = 1;
					} else {
						await this.ctx.guild
							.member(this.userId)
							.voice.setChannel(oldChannel)
							.catch(() => {
								banned = 11;
								connection.disconnect();
								return this.ctx.channel.send(`Ednaldo Pereira não conseguiu banir o ${this.user}.`);
							});
						currentChannel = 0;
					}
				}, 2500);
			}, 10000);

			playing.on("finish", async () => {
				await connection.disconnect();
			});

			return this.ctx.channel.send(`Ednaldo Pereira na sua forma suprema, está banindo: ${this.user}`);
		} catch (error) {
			return this.ctx.channel.send(`Ednaldo Pereira não conseguiu banir o ${this.user}.`);
		}
	}
}
