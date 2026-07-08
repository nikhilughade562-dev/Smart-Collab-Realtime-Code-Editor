const path = require("path");
const fs = require("fs-extra");
const { v4: uuid } = require("uuid");
const { spawn } = require("child_process");

const LANGUAGE_CONFIG = {

    python: {
        image: "python:3.12",
        fileName: "main.py",
        command: "python main.py < input.txt"
    },
    
    cpp: {
        image: "gcc:latest",
        fileName: "Main.cpp",
        command: "g++ Main.cpp -o main && ./main < input.txt"
    },

    java: {
        image: "eclipse-temurin:21",
        fileName: "Main.java",
        command: "javac Main.java && java Main < input.txt"
    }

};

const executeCode = async ({ language, code, input }) => {
    // 1. Generate unique job id
    const jobId = uuid();

    // 2. Create folder path
    const jobDir = path.join(__dirname, "..", "Temp", jobId);

    // 3. Create directory
    await fs.ensureDir(jobDir);

    // 4. Decide filename based on language
    const config = LANGUAGE_CONFIG[language];

    if (!config) {
        throw new Error("Unsupported Language");
    }

    const fileName = config.fileName;

    // 5. Full paths
    const codeFilePath = path.join(jobDir, fileName);
    const inputFilePath = path.join(jobDir, "input.txt");

    // 6. Write files
    await fs.writeFile(codeFilePath, code);
    await fs.writeFile(inputFilePath, input);

    const { image, command } = config;

return new Promise((resolve, reject) => {

    const docker = spawn("docker", [
        "run",

        "--rm",

        "--memory=256m",

        "--cpus=1",

         "--network",
        "none",

        "-v",
        `${jobDir}:/app`,

        "-w",
        "/app",

        image,

        "sh",
        "-c",

        command
    ]);

    let isTimedOut = false;

    const timeout = setTimeout(() => {
        isTimedOut = true;
        docker.kill("SIGKILL");
    }, 5000);

    docker.on("error", (err) => {
        console.error("Spawn Error:", err);
        reject(err);
   });

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => {
        stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
        stderr += data.toString();
    });

    docker.on("close", async (exitCode) => {

        clearTimeout(timeout);

        // delete temp folder
        await fs.remove(jobDir);

        if (isTimedOut) {

            return resolve({
                stdout: "",
                stderr: "Execution Timed Out (5 seconds)",
                exitCode: -1
            });
        }

        resolve({
            stdout,
            stderr,
            exitCode,
        });
    });

});
};

module.exports = {
    executeCode
};