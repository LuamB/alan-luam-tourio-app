import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter(); // Add redirection logic using useRouter
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: { place }, // This variant assumes that the data from the API endpoint is structured with a data property at the top level, which in turn contains a  place object. Destructuring with { data: { place } } effectively pulls out the nested place object. Without destructuring (which is how it was earlier), it assumes that the data returned from the API endpoint  is the place object itself, without the additional outer data layer.
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/places/${id}`);

  console.log("place: ", place);
  async function editPlace(place) {
    // console.log("Place edited (but not really...)");

    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      if (response.ok) {
        // mutate(`/api/places/${id}`, place);
        mutate();
        router.back(); // Redirect to details page

        // router.push(`/places/${id}`); // Also redirect to details page, but longer
      } else {
        throw new Error("Failed to update place");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // // test code starts...
  // const response = await fetch(`/api/places/${id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(place),
  // });

  // if (response.ok) {
  //   mutate();
  //   router.back();
  // } else {
  //   alert("There was a Error");
  // }
  // // ...test code ends.

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2 style={"text-align: center;"}>Error! </h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
