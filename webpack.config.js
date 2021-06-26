const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const { main } = require("./package.json");

module.exports = {
	devtool: "inline-source-map",
	entry: main,
	mode: "production",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				include: [path.resolve(__dirname, "src")],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".mp3", ".json"],
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new ProgressBarPlugin({
			format: `  build [:bar] ${chalk.green.bold(":percent")} (:elapsed seconds)`,
			clear: false,
		}),
	],
};
