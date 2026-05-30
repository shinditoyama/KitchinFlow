import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@backend/config/uploadthing";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>({
  url: "http://localhost:3333/api/uploadthing",
});
