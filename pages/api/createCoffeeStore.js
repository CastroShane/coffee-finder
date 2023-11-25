import {
  findRecordByFilter,
  getMinifiedRecords,
  table,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  const { id, name, address, neighbourhood, imgUrl, voting } = req.body;
  if (req.method === "POST") {
    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.status(200).json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  imgUrl,
                  voting,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.status(200).json(records);
          } else {
            res.status(400).json({ message: "Id or name is missing!" });
          }
        }
      } else {
        res.status(400).json({ message: "Id is missing!" });
      }
    } catch (err) {
      console.error("Error creating or finding a store", err);
      res
        .status(500)
        .json({ message: "Error creating or finding a store", err });
    }
  }
};

export default createCoffeeStore;
