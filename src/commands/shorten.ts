import Discord from "discord.js";
import axios from "axios";

async function Shorten(ctx: Discord.Message, link: string, custom = "") {
	try {
		let shortenedUrl;
		if (custom.length > 0) {
			shortenedUrl = await axios.post("https://tidis.net/api/shorten", {
				url: link,
				slug: custom,
			});
		} else {
			shortenedUrl = await axios.post("https://tidis.net/api/shorten", {
				url: link,
			});
		}
		shortenedUrl = shortenedUrl.data.a_alias;
		ctx.channel.send(`Link encurtado: https://tidis.net/${shortenedUrl}`);
	} catch (err) {
		console.log(err.response.data);
	}
}

export default Shorten;
