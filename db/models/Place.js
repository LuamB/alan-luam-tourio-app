import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  place: {
    name: String,
    location: String,
    image: String,
    mapURL: String,
    description: String,
    comments: { type: [Schema.Types.ObjectId], ref: "Comments" },
  },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
