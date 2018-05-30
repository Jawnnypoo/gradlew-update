import * as fs from 'fs'

export class Asserts {
    static assertGradlewExists() {
        if (fs.existsSync('gradlew') || fs.existsSync('gradlew.bat')) {
            //good to go
        } else {
            console.log("Gradle wrapper not found in current directory")
            process.exit(1);
        }
    }
}