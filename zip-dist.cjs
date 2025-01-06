const { rimraf } = require("rimraf");
const path = require("path");
const fs = require("fs/promises");
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
const { exec } = require("child_process");

dayjs.extend(utc);
dayjs.extend(timezone);

async function zipDist() {
	const fileName = `dist-info-${dayjs().format("YYYYMMDD-HHmm")}.zip`;
	const distPath = path.resolve(__dirname, "./dist");
	const zipPath = path.resolve(__dirname, fileName);
	const parentDir = path.resolve(__dirname, "./");

	try {
		// Check if the dist folder exists
		await fs.access(distPath);

		// Zip the dist folder (not its contents) by using a command-line zip
		const zipCommand =
			process.platform === "win32"
				? `tar -a -c -f ${zipPath} -C ${parentDir} dist` // For Windows
				: `zip -r ${zipPath} dist`; // For macOS/Linux

		exec(zipCommand, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error zipping folder: ${stderr}`);
			} else {
				console.log("Dist folder zipped to " + fileName);

				// Delete the dist folder after zipping
				rimraf(distPath)
					.then(() => {
						console.log("Dist folder deleted");
					})
					.catch((err) => {
						console.error("Error deleting dist folder:", err);
					});
			}
		});
	} catch (error) {
		if (error.code === "ENOENT") {
			console.error("Dist folder doesn't exist. Please build the project first.");
		} else {
			console.error("Error during zip and delete process:", error);
		}
	}
}

zipDist();
