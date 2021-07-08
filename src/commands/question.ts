import Discord from "discord.js";
import path from "path";

export default class {
	private ctx: Discord.Message;

	private question: string;

	private options = ["Sim ✅", "Não ❌"];

	constructor(context: Discord.Message, question: string) {
		this.ctx = context;
		this.question = question;

		try {
			if (question.length > 0) {
				this.chooseRandom();
			} else {
				this.ctx.channel.send("Uso do comando: question Eu vou me casar algum dia?");
			}
		} catch (err) {
			this.ctx.channel.send("Uso do comando: question Eu vou me casar algum dia?");
		}
	}

	private async chooseRandom() {
		this.ctx.delete();
		await this.ctx.channel.send(`
		**Hora da pergunta!**\nPergunta feita por: ${this.ctx.author.username}\n-\n${this.question}\n${
			(this.question, this.options[Math.floor(Math.random() * this.options.length)])
		}
		`);
		const embed = new Discord.MessageEmbed();
		this.ctx.channel.send(embed);
	}
}
