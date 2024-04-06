async function sentRequest(url) {
  let controller = new AbortController();
  let fetchAbort = setTimeout(() => controller.abort(), 5000);

  const response = await fetch(url, { signal: controller.signal });
  if (response.ok) {
    clearTimeout(fetchAbort);
    const apiResult = await response.json();
    return apiResult;
  } else {
    console.log("API faced an error");
  }
}

function gameBackgroundImages() {
  const accessKey = "FWWFU5BTcZFZszvw1khTU7ET2azykpe-I5jaNKj8lHk";
  const query = "ocean,sky";
  const color = "blue,white";
  const width = "1080";
  let imageURL = `https://api.unsplash.com/photos/random?query=${query}?color=${color}?w=${width}&client_id=${accessKey}`;
  sentRequest(imageURL)
    .then((res) => {
      console.log("Background Image Received.");
      document.body.style.backgroundImage = `url(${res.urls.full})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    })
    .catch((err) => {
      console.log(err);
    });
}

export { gameBackgroundImages };
