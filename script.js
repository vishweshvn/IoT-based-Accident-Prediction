// ===== CHANNEL 1: ESP32 / SENSOR DATA =====
const sensorChannelID = "3244801";
const sensorReadAPIKey = "5MPUHJ03D5KC2Z5J";

const sensorURL = `https://api.thingspeak.com/channels/${sensorChannelID}/feeds/last.json?api_key=${sensorReadAPIKey}`;


// ===== CHANNEL 2: ML ACCIDENT DECISION =====
const mlChannelID = "3247413";
const mlReadAPIKey = "V6DDIHFOE02L3WCE";

const mlURL = `https://api.thingspeak.com/channels/${mlChannelID}/feeds/last.json?api_key=${mlReadAPIKey}`;


// ===== FETCH SENSOR DATA (CHANNEL 1) =====
fetch(sensorURL)
  .then(response => response.json())
  .then(data => {

    // Sensor values (UNCHANGED)
    document.getElementById("accel").innerText = data.field1 || "--";
    document.getElementById("gyro").innerText = data.field2 || "--";

  })
  .catch(error => {
    console.error("Sensor Channel Error:", error);
  });

fetch(mlURL)
  .then(response => response.json())
  .then(data => {

    console.log("ML Channel Data:", data);

    if (Number(data.field1) === 1) {
      document.getElementById("status").innerText = "🚨 ACCIDENT DETECTED";
      document.getElementById("status").style.color = "red";
    } else {
      document.getElementById("status").innerText = "No Accident Detected";
      document.getElementById("status").style.color = "green";
    }

  })
  .catch(error => {
    console.error("ML Channel Error:", error);
    document.getElementById("status").innerText = "Error fetching ML data";
  });
// ===== DEVICE / INTERNET BASED GPS (NEW PART) =====
function getDeviceLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);

        document.getElementById("lat").innerText = latitude;
        document.getElementById("lon").innerText = longitude;

        console.log("Device GPS:", latitude, longitude);
      },
      error => {
        console.error("GPS Error:", error);
        document.getElementById("lat").innerText = "Permission denied";
        document.getElementById("lon").innerText = "Permission denied";
      }
    );
  } else {
    document.getElementById("lat").innerText = "Not supported";
    document.getElementById("lon").innerText = "Not supported";
  }
}

// Call GPS function
getDeviceLocation();

