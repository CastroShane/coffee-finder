import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  const { latLong, limit } = req.query;

  try {
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200).json(response);
  } catch (err) {
    console.error("There is an error:", err);
    res.status(500).json({ message: "Oh no! Something went wrong", err });
  }
};

export default getCoffeeStoresByLocation;
