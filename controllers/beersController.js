import Beer from "../models/Beer.js";

export const readAll = async (req, res) => {
  try {
    const beers = await Beer.find();

    res.status(200).json(beers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
