import Sandbox from "e2b";

export async function createSandbox() {
  const sandbox = await Sandbox.create("react-template", {
    timeoutMs: 120_000,
    apiKey: process.env.E2B_KEY,
  });
  const host = sandbox.getHost(5173);
  let sandboxId = sandbox.sandboxId;
  setTimeout(async () => {
    await sandbox.kill();
  }, 1000 * 130);
  return { host, sandboxId };
}
export async function resumeSandbox(sandboxId: string) {
  try {
    await Sandbox.connect(sandboxId);
    return true;
  } catch (e) {
    return false;
  }
}
export async function pauseSandbox(sandboxId: string) {
  try {
    await Sandbox.pause(sandboxId);
    return true;
  } catch (e) {
    return false;
  }
}
export async function killSandbox(sandboxId: string) {
  try {
    await Sandbox.kill(sandboxId);
    return true;
  } catch (e) {
    return false;
  }
}
