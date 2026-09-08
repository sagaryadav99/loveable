import "dotenv/config";
import { defaultBuildLogger, Template, waitForPort } from "e2b";
const template = Template()
  .fromImage("node:22")
  .aptInstall(["curl"]) // necessary for waitForPort
  .setWorkdir("/app")
  .copy("./react", "/app")
  .runCmd("npm install")
  .setStartCmd("npm run dev -- --host 0.0.0.0", waitForPort(5173));

async function main() {
  const buildInfo = await Template.build(template, "react-template", {
    cpuCount: 2, // CPU cores
    memoryMB: 2048, // Memory in MB
    skipCache: false, // Configure cache skip (except for files)
    onBuildLogs: defaultBuildLogger(), // Log callback receives LogEntry objects
    apiKey: process.env.E2B_KEY, // Override API key
  });
  console.log(buildInfo);
}
main().catch(console.error);
// buildInfo contains: { name, templateId, buildId }
