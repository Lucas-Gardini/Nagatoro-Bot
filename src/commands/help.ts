import Discord from "discord.js";

async function Help(ctx: Discord.Message) {
	const embed = new Discord.MessageEmbed();
	embed
		.setTitle("Comandos")
		.addField("ping", "Retorna: 'Pong!'")
		.addField("ban", "Ednaldo Pereira bane educadamente um usuário")
		.addField("ultraban", "Ednaldo Pereira usa todas as suas forças para banir um usuário, use: @usuário nomecanal")
		.addField("soundpad", "Toca um áudio da minha vasta coleção de áudios 🔈")
		.addField("say", "Faz o bot dizer qualquer coisa. ~isso mesmo qualquer coisa~")
		.addField("help", "Retorna: 'Isso que você está vendo babaca'")
		.setFooter(`Criado com ❤ por KowalskiJr 🐧#6486`)
		.setColor("#00FF7F")
		.setThumbnail("https://media1.tenor.com/images/59b6b892edbe0ca6ce6e260802c59f50/tenor.gif?itemid=22112736");
	return ctx.channel.send(embed);
}

export default Help;
