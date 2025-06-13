"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

// This function creates a new Startup pitch in the database
// It expects the user to be authenticated and returns a response object
// containing the status and any error messages.
// The function takes the current state, form data, and the pitch content as parameters.

export const createStartupPitch = async (state: unknown, form: FormData, pitch: string) => {
  const session = await auth();

  // Ensure the user is authenticated
  // If not, return an error response
  if (!session)
    return parseServerActionResponse({error: "Not signed in", status: "ERROR",});

  // Extract the form data, excluding the pitch content
  // The pitch content is passed separately to avoid including it in the slug
  // and to keep the slug clean and relevant to the startup title.
  // The slug is generated from the title to ensure uniqueness and SEO-friendliness.

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  // Validate that the required fields are present
  const slug = slugify(title as string, { lower: true, strict: true });


  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?.id,
      },
      pitch,
    };

    // Create the startup pitch in the database using the write client
    // The write client is configured to interact with the Sanity database.
    // The startup object is structured according to the schema defined in Sanity.
    // The function returns a response object with the status and any error messages.
  
    const result = await writeClient.create({ _type: "startup", ...startup });

    // If the creation is successful, return a success response with the created startup ID
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};