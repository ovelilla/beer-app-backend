import Like from "../models/like.model.js";

export const addLike = async (req, res) => {
  try {
    const { beerId } = req.body;
    const { _id: userId } = req.user;

    const like = new Like({ userId, beerId });

    const savedLike = await like.save();

    res.status(201).json({
      like: savedLike,
      message: "Like añadido con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLike = await Like.findByIdAndDelete(id);

    res.status(200).json({
      like: deletedLike,
      message: "Like eliminado con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const countLikes = async (req, res) => {
  try {
    const { beerId } = req.body;

    const likesCount = await Like.find({ beerId }).countDocuments();

    res.status(200).json({ likesCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
