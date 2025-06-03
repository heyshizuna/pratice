#!/usr/bin/env node
import { program } from 'commander'
import { exec } from 'child_process'
import { fileURLToPath } from 'url';
import inquirer from 'inquirer'
import fs, { promises as promisesFs } from 'fs'
import chalk from "chalk"
import path from 'path'
import ora from "ora"

const notCloneFiles = [
    "node_modules",
    "dist",
    "bin",
    "pnpm-lock.yaml",
    ".DS_Store",
]

const notDependencies = [
    "swiperv8",
    "swiperv11",
    "overlayscrollbars",
    "commander",
    "sass",
    "ora",
    "chalk",
    "ansi-colors",
    "inquirer"
]

const inquirerSetup = {
    projectName: {
        type: 'input',
        name: 'projectName',
        message: 'The Project name :',
        validate: (value) => value.trim().length > 0
            ? true : 'Please typing a project name.'
    },
    check: {
        type: "list",
        name: "check",
        message: (answers) => `Confirm ${chalk.cyan(answers.projectName)} :`,
        choices: ["Yes", "No"],
        default: "Yes"
    },
    active: {
        type: "list",
        name: "active",
        message: `Start install :`,
        choices: ["Yes", "No"],
        default: "Yes",
        when: (answers) => answers.check == "Yes"
    },
}

const cloneDirectory = (src, dest) => fs
    .readdirSync(src)
    .forEach((file) => {
        if (notCloneFiles.includes(file)) return

        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);

        if (fs.lstatSync(srcFile).isDirectory()) {
            fs.mkdirSync(destFile, { recursive: true });
            cloneDirectory(srcFile, destFile);
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    });

const createPackageJson = async (packagePath, projectName) => {
    try {
        const data = await promisesFs.readFile(packagePath, 'utf8');
        const packageJson = JSON.parse(data);
        const { version, dependencies, devDependencies } = packageJson;

        packageJson.name = projectName;
        packageJson.version = '0.0.1';

        packageJson.dependencies = {
            "swiperv11": "npm:swiper@11.1.3",
            "swiperv8": "npm:swiper@8.4.7",
            "sass": "1.77.4",
            "overlayscrollbars": "2.8.3",
        }

        packageJson.devDependencies = {}
        delete packageJson.bin;
        delete packageJson.private;

        const newPackageString = JSON.stringify(packageJson, null, 2);
        await promisesFs.writeFile(packagePath, newPackageString, 'utf8');

        return {
            version,
            dependencies: Object.keys(dependencies).filter(module => !notDependencies.includes(module)),
            devDependencies: Object.keys(devDependencies),
        }

    } catch (error) {
        console.error(`Error editing package.json: ${error}`);
    }
};

const createGitignore = async (packagePath) => {
    const npmignorePath = packagePath + "/.npmignore"
    const gitignorePath = packagePath + "/.gitignore"

    try {
        await promisesFs.rename(npmignorePath, gitignorePath);
    } catch (error) {
        console.error(`Error editing .gitignore: ${error}`);
    }
};

const runComman = (command) => new Promise((resolve, reject) =>
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return reject(error);
        }
        // console.log(stdout);
        if (stderr) console.error(stderr);

        resolve();
    })
)

const installSetup = async (projectPath, projectName) => {
    const startTime = process.hrtime();
    const spinner = ora({ spinner: 'dots', color: "red" });

    try {
        const {
            version,
            dependencies,
            devDependencies
        } = await createPackageJson(
            projectPath + "/package.json",
            projectName
        );

        await createGitignore(projectPath)

        console.log(" ")

        console.log(`Install process...`)
        console.log(" ")

        console.log(`Using ${chalk.cyan.bold("pnpm")}, install modules to ${chalk.cyan.bold(projectName)}`)
        console.log(" ")

        console.log(chalk.cyan.bold("Install dependencies:"))

        spinner.start("Installing swiper")
        await runComman("pnpm i");
        spinner.succeed("swiper")

        for (const module of dependencies) {
            spinner.start(chalk.gray("Installing " + module))
            await runComman("pnpm i " + module);
            spinner.succeed(module)
        }
        console.log(" ")

        console.log(chalk.cyan.bold("Installing devDependencies:"))

        for (const module of devDependencies) {
            spinner.start(chalk.gray("Installing " + module))
            await runComman("pnpm i " + module + " --save-dev");
            spinner.succeed(module)
        }

        spinner.stop()
        console.log(" ")

        console.log(
            "Project " + chalk.cyan.bold(projectName) + " install completed!!"
        );
        console.log(" ")

        console.log(
            "Installed" + " " +
            chalk.cyan.bold(dependencies.length + devDependencies.length + 2) + "" +
            "modules, done in" + " " +
            chalk.cyan.bold(process.hrtime(startTime)[0]) + "s"
        );
        console.log(" ")

        console.log(`@xwadex/fesd-framework ${chalk.cyan.bold(version)}`);
        console.log(" ")

        console.log(`${chalk.cyan.bold("cd " + projectName + " ; " + "pnpm dev")}`)
        console.log(" ")

        console.log(chalk.red("Enjoy :)"))

    } catch (err) {
        console.log(chalk.red.bold(err))
    }
};

program
    .version("0.0.1")
    .action(async () => {

        const isInstall = await inquirer.prompt([
            inquirerSetup.projectName,
            inquirerSetup.check,
            inquirerSetup.active,
        ]);

        const { projectName, active, check } = isInstall

        if (!projectName.length || active === 'No' || check === 'No') {
            console.log('Cancel install!!');
            return;
        }

        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const rootPath = path.join(__dirname, "../")
        const projectPath = path.join(process.cwd(), projectName);

        if (fs.existsSync(projectPath)) {
            console.error("Error: Project directory already exists.");
            return
        }

        fs.mkdirSync(projectPath, { recursive: true });
        cloneDirectory(rootPath, projectPath);

        process.chdir(projectPath);
        await installSetup(projectPath, projectName)

    });

program.parse(process.argv);

