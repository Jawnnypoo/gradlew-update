#!/usr/bin/env node
import axios from 'axios';
import { Commands } from './utils/commands';
import { Asserts } from './utils/asserts';

Asserts.assertGradlewExists()

console.log(`Fetching the latest Gradle version...`)
// See https://github.com/Jawnnypoo/gradlew-update-service for the source of this endpoint
axios({
    method: 'get',
    url: 'https://gradlew-update-service.uc.r.appspot.com/',
    responseType: 'text'
})
    .then(function (response) {
        const version = response.data
        const currentVersion = Commands.runVersionCommand()
        if (currentVersion == version) {
            console.log(`Already on the latest stable version of Gradle: ${version}`)
        } else {
            console.log(`Updating to ${version}...`)
            Commands.runUpgradeCommand(version)
            console.log(`Successfully updated to ${version}`)
        }
    })
    .catch(err => {
        console.log(err)
    })