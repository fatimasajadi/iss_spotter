const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error !== null) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 404) {
      callback(new Error('Breed not found'), null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(new Error('HTTP status fetchmyip not OK'), null);

      return;
    }
    let data = JSON.parse(body);
    callback(null, data)
  });;
}

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipvigilante.com/${ip}`;

  request(url, (error, response, body) => {
    if (error !== null) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 404) {
      callback(new Error('url not found'), null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(new Error('HTTP status fetchCoordsByIP not OK'), null);
      return;
    }
    let data = JSON.parse(body);
    callback(null, data);
  });;
}

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.data.latitude}&lon=${coords.data.longitude}`;

  request(url, (error, response, body) => {
    if (error !== null) {
      callback(error, null);
      return;
    }

    if (response.statusCode === 404) {
      callback(new Error('url not found'), null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(new Error('HTTP status fetchISSFlyOverTimes not OK'), null);
      return;
    }
    let data = JSON.parse(body);
    callback(null, data);
  });;
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, result1) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(result1.ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };