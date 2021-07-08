import Discord from "discord.js";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function Help(ctx: Discord.Message) {
	const embed = new Discord.MessageEmbed();
	embed
		.setTitle("Comandos")
		.addField("ping", "Retorna: 'Pong!'")
		.addField("ban", "Ednaldo Pereira bane educadamente um usuário")
		.addField("ultraban", "Ednaldo Pereira usa todas as suas forças para banir um usuário, use: @usuário nomecanal")
		.addField(
			"soundpad",
			"Toca um áudio da minha vasta coleção de áudios 🔈, ~digite somente soundpad para listar os áudios~"
		)
		.addField("random", "Escolhe um item aleatório. ~ex: random 1 2 3 4~")
		.addField("say", "Faz o bot dizer qualquer coisa. ~isso mesmo qualquer coisa~")
		.addField("question", "Responde uma pergunta com sim ou não")
		.addField("gordao", "Menciona o gordão. ~meio óbvio não?~")
		.addField("help", "Retorna: 'Isso que você está vendo babaca'")
		.setFooter(`Criado com ❤ por KowalskiJr 🐧#6486`)
		.setColor("#00FF7F")
		.setThumbnail("https://thumbs.gfycat.com/PoorMinorConch-size_restricted.gif");
	return ctx.channel.send(embed);
}

export default Help;
