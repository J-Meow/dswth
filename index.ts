import envPaths from "env-paths"
import { readdir, exists } from "node:fs/promises"
import path from "node:path"

const paths = envPaths("dswth", { suffix: "" })

const configDir = Bun.env.DSWTH_CONFIG_DIR || paths.config
console.log("Starting DSWTH with configuration directory: " + configDir)
const mainConfigFile = Bun.file(path.join(configDir, "dswth.yaml"))
if (!(await mainConfigFile.exists())) {
    throw new Error("No dswth.yaml file in configuration directory!")
}
const automationsDir = path.join(configDir, "automations")
if (!(await exists(automationsDir))) {
    throw new Error("No automations folder in configuration directory!")
}
const automationFiles = await readdir(automationsDir)
console.log(automationFiles)
const automations = []
for (let i = 0; i < automationFiles.length; i++) {
    const filename = automationFiles[i]!
    if (filename.endsWith(".yaml")) {
        const file = Bun.file(path.join(automationsDir, filename))
        const yaml = Bun.YAML.parse(await file.text())
        automations.push({ id: filename.slice(0, -5), contents: yaml })
    }
}
const mainConfig = Bun.YAML.parse(await mainConfigFile.text())
console.log(mainConfig)
console.log(automations)
