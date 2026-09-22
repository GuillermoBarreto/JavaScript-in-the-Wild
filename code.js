let coords = {
    latitude: 0,
    longitude: 0,
    };
    navigator.geolocation.watchPosition(success);
    
    
    
    // Geolocation API Stuf
    function success(pos){
        const crd = pos.coords;
    
        if (
    coords.latitude !== crd.latitude || 
            coords.longitude !== crd.longitude 
        ) {
            coords.latitude = crd.latitude;
            coords.longitude = crd.longitude; 
            console.log("Your coordinate has changed");
            console.log(`latitud: ${coords.latitude} longitud: ${coords.longitude}`);
        } else {

            console.log("your coordinates are the same.");
        
}   
    }

  // secret: 81f5bf099c5bf307
    const key = '827bc0d33030b8e5fd3894e611147130';
    let queryURL = 'https://api.flickr.com/services/rest/?api_key=827bc0d33030b8e5fd3894e611147130&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=Corolla';
    
    function constructImageURL (photoObj) {
            return (
                 "https://farm" + 
                 photoObj.farm +
                ".staticflickr.com/" +
                 photoObj.server +
                 "/" +
                 photoObj.id + 
                 "_" +
                 photoObj.secret +
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
