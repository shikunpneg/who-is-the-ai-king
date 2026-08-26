// download-log.ts — 拉 GitHub Actions 日志
import { execSync } from "child_process";
import * as fs from "fs";
import * as https from "https";
import { pipeline } from "stream/promises";

const ZIP = ".run-log.zip";
const DIR = ".run-logs";

// 1) git 凭据 → token
const credIn = "protocol=https\nhost=github.com\n\n";
const out = execSync("git credential fill", { input: credIn, encoding: "utf8" });
const m = out.match(/^password=(\S+)/m);
if (!m) throw new Error("no token");
const TOKEN = m[1];
console.log("Token length:", TOKEN.length);

fs.rmSync(DIR, { recursive: true, force: true });
if (fs.existsSync(ZIP)) fs.unlinkSync(ZIP);

function follow(u: string, hops = 5): Promise<import("http").IncomingMessage> {
  return new Promise((res, rej) => {
    const r = https.get(
      u,
      { headers: { Authorization: "Bearer " + TOKEN, "User-Agent": "m" } },
      (rs) => {
        if ([301, 302, 303, 307, 308].includes(rs.statusCode || 0)) {
          if (hops <= 0) return rej(new Error("redirect limit"));
          const n = rs.headers.location!;
          rs.resume();
          return follow(n, hops - 1).then(res, rej);
        }
        if (rs.statusCode !== 200) return rej(new Error("HTTP " + rs.statusCode));
        res(rs);
      }
    );
    r.on("error", rej);
  });
}

(async () => {
  const url =
    "https://api.github.com/repos/shikunpneg/who-is-the-ai-king/actions/runs/32936856566/logs";
  const r = await follow(url);
  await pipeline(r, fs.createWriteStream(ZIP));
  console.log("downloaded:", fs.statSync(ZIP).size, "bytes");
})().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
