import { resolve } from 'path';
import { path } from 'app-root-path';

export default {
	mode: process.env.NODE_ENV || "development",
	target:"web",
	entry:resolve(path, "app"),
	plugins: [],
	context: resolve(__dirname),
	output: {
		filename: 'client.js',
		path: resolve(__dirname, "public")
	},
	node: {
		__dirname: false
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			process: "process/browser"
		}   
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						plugins:[
							"@babel/transform-runtime"
						],
					}
				}
			}
		]
	}
}