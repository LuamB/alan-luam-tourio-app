// import { db_places } from "../../../../lib/db_places";
import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const id = request.query.id;

  if (!id) {
    return response.status(404).json({ status: "Not found" });
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json({ place: place });
    // console.log("response: ", response);
  }

  if (request.method === "PATCH") {
    const updatedPlace = request.body;

    console.log("updatedPlace: ", request.body);
    console.log("ID: ", id);

    await Place.findByIdAndUpdate(id, updatedPlace);
    if (!updatedPlace) {
      return response
        .status(404)
        .json({ status: "Could not update the place." });
    }

    response.status(200).json({ status: "Your place has been updated." });
  }

  // Find the place by its ID and update the content that is part of the request body!
  // If successful, you'll receive an OK status code.
  // const place = db_places.find((place) => place._id.$oid === id);

  // const comment = place?.comments;
  // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  // const comments = db_comments.filter((comment) =>
  //   allCommentIds.includes(comment._id.$oid)
  // );

  // response.status(200).json({ place: place, comments: comments });
}
