/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Discord from "discord.js";
import path from "path";

export default async (ctx: Discord.Message) =>
	(await ctx.guild.member(ctx.author).voice.channel.join())
		.play(path.join(__dirname, "../resources/moan.mp3"))
		.on("finish", () => {
			ctx.guild.member(ctx.author).voice.channel.leave();
		});
