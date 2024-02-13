// import { db_places } from "../../../lib/db_places";
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
      const placeData = request.boy;
      await Place.create(placeData);
      return response.status(200).json({ status: "Place created" });
    } catch (e) {
      console.error(e);
      return response.status(400).json({ error: e.message });
    }
  }
}
