import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};
const getListOfCoffeePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
  });
  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};
export const fetchCoffeeStores = async (
  latLong = `45.49987473021185%2C-73.63800438721213`,
  limit = 6
) => {
  const photos = await getListOfCoffeePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),
    options
  );
  const data = await response.json();

  return data.results.map((result, i) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[i] : null,
    };
  });
};
