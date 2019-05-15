#!/usr/bin/env node
import axios from 'axios';
import { Commands } from './utils/commands';
import { Asserts } from './utils/asserts';

Asserts.assertGradlewExists()

console.log(`Finding the latest Gradle version. This could take a few seconds...`)
axios({
    method: 'get',
    url: 'https://gradle-version.glitch.me/',
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