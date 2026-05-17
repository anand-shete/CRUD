import { Router } from "express";

const router: Router = Router();

router.get("/health", (req, res) => {
  return res.status(200).send({ message: "node-app healthcheck passed" });
});

export default router;
