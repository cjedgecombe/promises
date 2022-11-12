/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var async = require('./promisification.js');
var pC = require('./promiseConstructor.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pC.pluckFirstLineFromFileAsync(readFilePath)
  .then((firstLine) => { return async.getGitHubProfileAsync(firstLine)})
  .then((userData) => {
    return new Promise((resolve, reject) => { fs.writeFile(writeFilePath, JSON.stringify(userData), (err) => {
      if (err) {
        console.log('error writing file');
      } else {
        resolve();
      }
    })})
  })
};
// //fs.writeFile(writeFilePath, JSON.stringify(userData), (err) => {
//   if (err) {
//     console.log('error writing file')
//   }
// })

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
