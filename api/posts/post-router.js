const router = require("express").Router();
const { findPost, newPost, upPost } = require("./posts-model");
const { validToken, changeAuth } = require("./posts-middleware");

router.get("/", validToken, async (req, res, next) => {
  try {
    const allPosts = await getallPosts();
    res.json(allPosts);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  //post id'ye göre post'a gidiyor
  try {
    const intentPost = await findPost(req.params.id);
    res.json(intentPost);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    if (!req.body.postContent) {
      res.status(401).json({ message: "post içeriği girilmeli" });
    } else {
      const model = {
        postContent: req.body.postContent,
        userId: req.codeToken.userId,
      };

      const newData = await newPost(model);
      res.status(201).json(newData);
    }
  } catch (error) {
    next(error);
  }
});
router.put("/:id", changeAuth, async (req, res, next) => {
  try {
    const up = await upPost(req.params.id, req.body);
    res.status(201).json(up);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", changeAuth, async (req, res, next) => {
  try {
    await removePost(req.params.id);
    res.status(204).json({ message: "silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});
