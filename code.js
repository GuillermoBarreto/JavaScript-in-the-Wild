let coords = {
  latitude: 0,
  longitude: 0,
};

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(success, geoError);
} else {
  console.error("Geolocation is not supported by this browser.");
}

// Geolocation API stuff
function success(pos) {
  const crd = pos.coords;

  if (
    coords.latitude !== crd.latitude ||
    coords.longitude !== crd.longitude
  ) {
    coords.latitude = crd.latitude;
    coords.longitude = crd.longitude;
    console.log("Your coordinate has changed");
    console.log(`latitud: ${coords.latitude} longitud: ${coords.longitude}`);
  } else {
    console.log("your coordinates are the same.");
  }
}

// Runs when the user denies permission or the position can't be determined.
function geoError(err) {
  console.error("Could not get your location:", err.message);
}

// Get your own key at https://www.flickr.com/services/api/misc.api_keys.html
// and paste it below. Never commit a real API key to the repo.
const FLICKR_API_KEY = "YOUR_FLICKR_API_KEY";
const queryURL = `https://api.flickr.com/services/rest/?api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=Corolla`;

function constructImageURL(photoObj) {
  return (
    "https://farm" +
    photoObj.farm +
    ".staticflickr.com/" +
    photoObj.server +
    "/" +
    photoObj.id +
    "_" +
    photoObj.secret +
    ".jpg"
  );
}

//fetch stuff

fetch(queryURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Flickr request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const photos = (data.photos && data.photos.photo) || [];
    if (photos.length === 0) {
      console.log("No photos found for this search.");
      return;
    }
    const img = document.createElement("img");
    document.body.append(img);
    let i = 0;
    setInterval(function () {
      img.src = constructImageURL(photos[i]);
      i = (i + 1) % photos.length;
    }, 2000);
  })
  .catch((err) => console.error("Failed to load Flickr photos:", err));
