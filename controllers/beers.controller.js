// Models
import Beer from "../models/beer.model.js";
import Like from "../models/like.model.js";
// Utils
import {
  deleteFile,
  deleteFiles,
  uploadFile,
} from "../utils/cloudinary.utils.js";

export const readAll = async (req, res) => {
  try {
    const beers = await Beer.find();

    res.status(200).json(beers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const readByLike = async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const likes = await Like.find({ userId });

    const beerIds = likes.map((like) => like.beerId);

    const beers = await Beer.find({ _id: { $in: beerIds } });

    const likesCountByBeer = likes.reduce((acc, like) => {
      acc[like.beerId] = (acc[like.beerId] || 0) + 1;
      return acc;
    }, {});

    const userLikesMap = likes.reduce((acc, like) => {
      const beerIdStr = like.beerId.toString();
      acc[beerIdStr] = like;
      return acc;
    }, {});

    const beersWithLikes = beers.map((beer) => ({
      ...beer._doc,
      likesCount: likesCountByBeer[beer._id] || 0,
      userLike: userLikesMap[beer._id] || null,
    }));

    res.status(200).json(beersWithLikes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const readOne = async (req, res) => {
  try {
    const beer = await Beer.findById(req.params.id);

    const likes = await Like.find({ beerId: beer._id });

    const likesCount = likes.length;

    const userLike = likes.find((like) => like.userId.equals(req.user._id));

    res.status(200).json({ ...beer._doc, likesCount, userLike });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  const { file, body } = req;
  const { name } = body;

  const errors = {};

  if (!name) {
    const error = new Error("El nombre es obligatorio");
    errors.name = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    let upload = { public_id: "beers/bq5utxabegdp2f2jj4gr" };
    if (file) {
      upload = await uploadFile(file.path, "beers");
    }

    const beer = await Beer.create({
      ...body,
      cloudinaryPublicId: upload.public_id,
    });

    res.status(201).json({
      message: "Cerveza creada con éxito",
      beer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const find = async (req, res) => {
  const {
    flavor,
    body,
    color,
    ibus,
    alcohol,
    craft,
    country,
    pairing,
    type,
    event,
  } = req.body;
  const { _id: userId } = req.user;

  const ibusRange = {
    ["Muy bajo (0-20)"]: { $gte: 0, $lte: 20 },
    ["Suave y equilibrado (21-40)"]: { $gte: 21, $lte: 40 },
    ["Amargor moderado (41-60)"]: { $gte: 41, $lte: 60 },
    ["Amargor pronunciado (61-80)"]: { $gte: 61, $lte: 80 },
    ["Amargor muy intenso (81-100)"]: { $gte: 81, $lte: 100 },
  };

  const alcoholRange = {
    ["Baja (1% - 4.5%)"]: { $gte: 1, $lte: 4.5 },
    ["Media (4.6% - 7.5%)"]: { $gte: 4.6, $lte: 7.5 },
    ["Alta (7.6% o más)"]: { $gte: 7.6 },
  };

  const query = {};

  if (flavor) query.flavor = flavor;
  if (body) query.body = body;
  if (color) query.color = color;
  if (ibus) query.ibus = ibusRange[ibus];
  if (alcohol) query.alcohol = alcoholRange[alcohol];
  if (craft) query.craft = craft;
  if (country) query.country = country;
  if (pairing) query.pairing = pairing;
  if (type) query.class = type;
  if (event) query.event = event;

  try {
    const beers = await Beer.find(query);

    const beerIds = beers.map((beer) => beer._id);

    const likes = await Like.find({ beerId: { $in: beerIds } });

    const likesCountByBeer = likes.reduce((acc, like) => {
      acc[like.beerId] = (acc[like.beerId] || 0) + 1;
      return acc;
    }, {});

    const userLikesMap = likes
      .filter((like) => like.userId.equals(userId))
      .reduce((acc, like) => {
        const beerIdStr = like.beerId.toString();
        acc[beerIdStr] = like;
        return acc;
      }, {});

    const beersWithLikes = beers.map((beer) => ({
      ...beer._doc,
      likesCount: likesCountByBeer[beer._id] || 0,
      userLike: userLikesMap[beer._id] || null,
    }));

    res.status(200).json(beersWithLikes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { file, body } = req;

  const { name } = body;

  const errors = {};

  if (!name) {
    const error = new Error("El nombre es obligatorio");
    errors.name = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    if (file) {
      const upload = await uploadFile(file.path, "beers");
      req.body.cloudinaryPublicId = upload.public_id;
    }

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
    const beer = await Beer.findById(req.params.id);

    await deleteFile(beer.cloudinaryPublicId, "beers");

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
    const beers = await Beer.find({ _id: { $in: ids } });

    const publicIds = beers.map((beer) => beer.cloudinaryPublicId);

    await deleteFiles(publicIds, "beers");

    await Beer.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${
        ids.length > 1 ? "Cervezas eliminadas" : "Cerveza eliminada"
      } con éxito`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
