#!/usr/bin/env node

import { Factorial } from './utils/factorial';
import * as Path from 'path';
import axios from 'axios';

axios({
    method: 'get',
    url: 'https://gradle-version.glitch.me/',
    responseType: 'text'
})
    .then(function (response) {
        console.log(response.data)
    })
    .catch(err => {
        console.log(err)
    })