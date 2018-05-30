#!/usr/bin/env node

import * as fs from 'fs'
import axios from 'axios';
import { Commands } from './utils/commands';
import { Asserts } from './utils/asserts';

axios({
    method: 'get',
    url: 'https://gradle-version.glitch.me/',
    responseType: 'text'
})
    .then(function (response) {
        const version = response.data
        Asserts.assertGradlewExists()
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