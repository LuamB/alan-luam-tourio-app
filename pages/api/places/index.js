import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      const newPlace = await Place.create(placeData);
      return response
        .status(201) // status code for successful place posting
        .json({ status: "Place created", place: newPlace });
    } catch (error) {
      console.error(error);
      //  Check if it's a validation error from Mongoose
      if (error.name === "ValidationError") {
        return response.status(400).json({ message: error.message }); // validation errors
      }

      // Likely a different server error
      console.error("Error creating place:", error);
      return response.status(500).json({ message: "Something went wrong" }); // other server errors
    }
    // Respond to other methods, likely '405 - Method Not Allowed'
    return response.status(405).json({ message: "Method not allowed" });
  }
}
