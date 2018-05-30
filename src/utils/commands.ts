import * as os from 'os'
import { spawnSync } from 'child_process'

export class Commands {

    /**
     * Returns the version that the user is currently on from the gradle wrapper
     */
    static runVersionCommand(): string {
        const versionTxt = this.runGradleCommand('--version')
        return this.versionFromOutput(versionTxt)
    }

    /**
     * Upgrades the gradle wrapper to the given version
     * @param version the version to upgrade to
     */
    static runUpgradeCommand(version: string) {
        this.runGradleCommand('wrapper', '--gradle-version', version, '--distribution-type', 'all')
    }

    private static versionFromOutput(output: string): string {
        const key = "Gradle "
        const startIndex = output.indexOf(key)
        const endIndex = output.indexOf("\n", startIndex)
        return output.substring(startIndex + key.length, endIndex).trim()
    }

    private static runGradleCommand(...args: string[]): string {
        const platform = os.platform();
        let command = "./gradlew"
        if (platform == "win32") {
            command.replace('./gradlew', 'gradlew.bat')
        }
        const gradle = spawnSync(command, args);
        if (gradle.stderr.length > 0) {
            console.log(gradle.stderr.toString())
            process.exit(1);
        }

        return gradle.stdout.toString()
    }
}