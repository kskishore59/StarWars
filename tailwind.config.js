module.exports = {
	content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss"),
		require("autoprefixer"),
		//ts-ignore
		require("flowbite/plugin"),
		{
			tailwindcss: { config: "./tailwindcss-config.js" },
		},
	],
};
