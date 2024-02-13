import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    // return response.status(404).json({ status: "Not found" });
    return;
  }

  await dbConnect(); // initializing the connection

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json({ place: place });
  }

  if (request.method === "PATCH") {
    // new code starts here...
    await Place.findByIdAndUpdate(id, { $set: request.body });

    return response.status(200).json({ status: "Place updated" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
// ...and ends here.

//   // previous code starts here...
//   const updatedPlaceData = request.body;

//   try {
//     // use Mongoose's findByIdAndUpdate to update the Place document:
//     const updatedPlace = await Place.findByIdAndUpdate(id, updatedPlaceData, {
//       new: true, // Returns the updated document in the response
//       runValidators: true, // Ensures data integrity by running user defined Mongoose schema's validation rules during the update.
//     });

//     if (!updatedPlace) {
//       return response.status(404).json({ status: "Place not found" });
//     }

//     response
//       .status(200)
//       .json({ status: "Place updated", place: updatedPlace });
//   } catch (error) {
//     return response
//       .status(500)
//       .json({ status: "Error updating place", error: error.message });
//   }
// }
// // ... previous code ends here.

// await Place.findByIdAndUpdate(id, updatedPlace);
// if (!updatedPlace) {
//   return response
//     .status(404)
//     .json({ status: "Could not update the place." });
// }

// response.status(200).json({ status: "Your place has been updated." });
// }

// Find the place by its ID and update the content that is part of the request body!
// If successful, you'll receive an OK status code.
// const place = db_places.find((place) => place._id.$oid === id);

// const comment = place?.comments;
// const allCommentIds = comment?.map((comment) => comment.$oid) || [];
// const comments = db_comments.filter((comment) =>
//   allCommentIds.includes(comment._id.$oid)
// );

// response.status(200).json({ place: place, comments: comments });
