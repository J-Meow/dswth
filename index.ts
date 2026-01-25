import envPaths from "env-paths"

const paths = envPaths("dswth", { suffix: "" })

const configDir = Bun.env.DSWTH_CONFIG_DIR || paths.config
console.log("Starting DSWTH with configuration directory: " + configDir)

