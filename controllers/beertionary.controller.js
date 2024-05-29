// Models
import Entry from "../models/entry.model.js";

export const readAll = async (req, res) => {
  try {
    const entries = await Entry.find();

    res.status(200).json(entries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const readOne = async (req, res) => {
  try {
    const entry = await Entry.findOne({ word: req.params.word });

    res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  const { word, description } = req.body;

  const errors = {};

  if (!word) {
    const error = new Error("La palabra es obligatoria");
    errors.word = error.message;
  }

  if (!description) {
    const error = new Error("La descripción es obligatoria");
    errors.description = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const entry = await Entry.create({ word, description });

    res.status(201).json({
      message: "Entrada creada con éxito",
      entry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { word, description } = req.body;

  const errors = {};

  if (!word) {
    const error = new Error("La palabra es obligatoria");
    errors.word = error.message;
  }

  if (!description) {
    const error = new Error("La descripción es obligatoria");
    errors.description = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Entrada actualizada con éxito",
      entry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Entrada eliminada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeMultiple = async (req, res) => {
  const { ids } = req.body;

  try {
    await Entry.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${
        ids.length > 1 ? "Entradas eliminadas" : "Entrada eliminada"
      } con éxito`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
