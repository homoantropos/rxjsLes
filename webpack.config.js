const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = ["rxjs", "forms_abort", "push_notifications"].map((name) => {
	return {
		name,
		entry: `./${name}/src/${name}.js`,
		output: {
			path: path.resolve(__dirname, `./${name}/dist/`),
			filename: `${name}.js`,
			clean: true,
			publicPath: "/"
		},
		mode: "none",
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"]
						}
					}
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource"
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, `./${name}/src/${name}.html`)
			}),
			new MiniCssExtractPlugin({
				filename: `${name}.css`
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			})
		],
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()]
		},
		devtool: "source-map",
		devServer: {
			static: path.resolve(__dirname, `./${name}/dist`),
			liveReload: true,
			hot: true,
			historyApiFallback: true,
			open: true
		}
	};
});
