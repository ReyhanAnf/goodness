// "use client"
// import React, { useState, useEffect } from 'react';

// export function clientLocation() {
//   const [position, setPosition] = useState({ latitude: -6.200000, longitude: 106.816666 }); // jakarta is default location 

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         setPosition({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       });
//     } else {
//       console.log("Geolocation is not available in your browser.");
//     }
//   }, []);

//   return position
// }

