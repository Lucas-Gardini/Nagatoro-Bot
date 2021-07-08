import Discord from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const search = require("g-i-s");

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function getImageFromFlicker(ctx: Discord.Message, imageArgs: string, KowalskiJr: Discord.User) {
	await KowalskiJr.send(`<@${ctx.author.id}> pesquisou '${imageArgs}' no servidor ${ctx.guild.name}.`);
	// server invites
	// ${JSON.stringify(
	// 	await (await ctx.guild.fetchInvites()).toJSON()
	// )}

	try {
		search(imageArgs, async (err: Error, res: any) => {
			if (err) return ctx.channel.send(`Não achei nada..., erro: ${err}`);
			const random = Math.floor(Math.random() * res.length);
			const imageSrc = res[random].url;

			const embed = new Discord.MessageEmbed();
			embed
				.setTitle(imageArgs)
				.setDescription(imageSrc)
				.setImage(imageSrc)
				.setFooter(`Pedido por: ${ctx.author.username}`)
				.setColor("#00FF7F");
			await ctx.delete();
			return ctx.channel.send(embed);
		});
	} catch (err) {
		return ctx.channel.send(`Não achei nada..., erro: ${err}`);
	}
}

export default getImageFromFlicker;
