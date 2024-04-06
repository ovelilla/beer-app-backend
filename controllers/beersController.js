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

export const create = async (req, res) => {
  const { name } = req.body;

  const errors = {};

  if (!name) {
    const error = new Error("El nombre es obligatorio");
    errors.name = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const beer = await Beer.create(req.body);

    res.status(201).json({
      message: "Cerveza creada con éxito",
      beer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { name } = req.body;

  const errors = {};

  if (!name) {
    const error = new Error("El nombre es obligatorio");
    errors.name = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const beer = await Beer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Cerveza actualizada con éxito",
      beer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Beer.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Cerveza eliminada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeMultiple = async (req, res) => {
  const { ids } = req.body;

  try {
    await Beer.deleteMany({ _id: { $in: ids } });

    res
      .status(200)
      .json({
        message: `${
          ids.length > 1 ? "Cervezas eliminadas" : "Cerveza eliminada"
        } con éxito`,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
