#!/usr/bin/env node

import { Factorial } from './utils/factorial';
import * as fs from 'fs'
import axios from 'axios';

const { spawnSync } = require('child_process')

axios({
    method: 'get',
    url: 'https://gradle-version.glitch.me/',
    responseType: 'text'
})
    .then(function (response) {
        const version = response.data
        console.log(`Upgrading to ${version}`)
        if (fs.existsSync('gradlew') || fs.existsSync('gradlew.bat')) {
            const gradle = spawnSync('gradlew.bat', ['-lh', '/usr']);
            console.log(`stderr: ${gradle.stderr.toString()}`);
            console.log(`stdout: ${gradle.stdout.toString()}`);
        } else {
            console.log('Gradle wrapper not found in current directory')
        }
    })
    .catch(err => {
        console.log(err)
    })