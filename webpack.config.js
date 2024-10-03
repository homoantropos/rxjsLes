const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ['rxjs'].map(name => {
    return {
        name,
        entry: `./${name}/src/${name}.js`,
        output: {
            path: path.resolve(__dirname, `./${name}/dist/`),
            filename: `${name}.js`,
            clean: true,
            publicPath: "./"
        },
        mode: "none",
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
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
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `./${name}/src/${name}.html`)
            }),
            new MiniCssExtractPlugin({
                filename: `${name}.css`
            })
        ],
        devServer: {
            static: path.resolve(__dirname, `./${name}/dist`),
            open: true,
            liveReload: true,
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()]
        },
        devtool: "source-map"
    }
})
