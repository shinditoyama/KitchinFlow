import { Router } from "express";
import { createRouteHandler } from "uploadthing/express";
import { ourFileRouter } from "@/config/uploadthing";

const router: Router = Router();

router.use(
  "/uploadthing",
  createRouteHandler({
    router: ourFileRouter,
    config: {
      callbackUrl: "http://localhost:3333/api/uploadthing",
      token: process.env.UPLOADTHING_TOKEN,
    },
  }),
);

export default router;
