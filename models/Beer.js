import mongoose from "mongoose";

const beerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
    },
    flavor: {
      type: String,
      trim: true,
    },
    alcohol: {
      type: Number,
    },
    country: {
      type: String,
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    pairing: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    class: {
      type: String,
      trim: true,
    },
    style: {
      type: String,
      trim: true,
    },
    craft: {
      type: String,
      trim: true,
    },
    fermentation: {
      type: String,
      trim: true,
    },
    ibus: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    popularity: {
      type: String,
      trim: true,
    },
    recommendation: {
      type: String,
      trim: true,
    },
    brewery: {
      type: String,
      trim: true,
    },
    reputation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Beer = mongoose.model("Beer", beerSchema);

export default Beer;
