import Discord from "discord.js";

function Ping(ctx: Discord.Message) {
	return ctx.channel.send("Pong! 🏓");
}

export default Ping;
