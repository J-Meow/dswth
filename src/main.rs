use std::env;
use std::path::Path;

fn main() {
    let config_dir = match env::var("DSWTH_CONFIG_PATH") {
        Ok(val) => Path::new(&val).to_path_buf(),
        Err(_e) => {
            if let Some(config_dir) = dirs::config_dir() {
                let mut config_dir_final = config_dir;
                config_dir_final.push("dswth");
                config_dir_final
            } else {
                panic!("No configuration directory found. Please specify the environment variable DSWTH_CONFIG_PATH.");
            }
        }
    };
    println!("Starting DSWTH with configuration directory: {}", config_dir.display());
}
