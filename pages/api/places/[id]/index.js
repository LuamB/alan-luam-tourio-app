import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect(); // initializing the connection
  const { id } = request.query;

  if (!id) {
    return response.status(404).json({ status: "Not found" });
  }

  switch (request.method) {
    case "GET":
      const place = await Place.findById(id);

      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }
      return response.status(200).json({ place: place });

    case "PATCH":
      await Place.findByIdAndUpdate(id, { $set: request.body });
      return response.status(200).json({ status: "Place updated" });

    case "DELETE":
      await Place.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ status: `Place ${id} successfully deleted.` });

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
