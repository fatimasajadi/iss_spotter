const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, result1) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  // console.log('It worked! Returned IP:', result1);

  fetchCoordsByIP(result1.ip, (error, coords) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    // console.log('It worked! Returned Geographical Location:', coords);

    fetchISSFlyOverTimes(coords, (error, nextPasses) => {

      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      // console.log('It worked! Returned time object is : ', nextPasses);

      const printPassTimes = function(nextPasses) {
        let nextPassesArr = nextPasses.response
        for (const pass of nextPassesArr) {

          const datetime = new Date(0);
          datetime.setUTCSeconds(pass.risetime);
          const duration = pass.duration;
          console.log(`Next pass at ${datetime} for ${duration} seconds!`);
        }
      };

      nextISSTimesForMyLocation((error, nextPasses) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        printPassTimes(nextPasses);
      });

    });

  });

});

;