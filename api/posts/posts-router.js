// posts için gerekli routerları buraya yazın
const router = require("express").Router();
const postModel = require("./posts-model");

router.get("/", async (req, res) => {
  try {
    const allPost = await postModel.find();
    res.json(allPost);
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
  }
});
router.post("/", async (req, res) => {
  try {
    // let postTitle=req.body.title;
    // let postContents=req.body.contents
    let { title, contents } = req.body;
    if (!contents || !title) {
      res.status(400).json({
        message: "Lütfen gönderi için bir title ve contents sağlayın",
      });
    } else {
      const postPost = await postModel.insert({ title, contents });
      const banagelenid = await postModel.findById(postPost.id);
      res.status(201).json(banagelenid);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      let { title, contents } = req.body;
      if (!contents || !title) {
        res.status(400).json({
          message: "Lütfen gönderi için bir title ve contents sağlayın",
        });
      } else {
        const updatedPost = await postModel.update(req.params.id, {
          title,
          contents,
        });
        const findPost = await postModel.findById(updatedPost);
        res.json(findPost);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      await postModel.remove(req.params.id);
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Girilen ID'li gönderi bulunamadı." });
    } else {
      const commentPost = await postModel.findPostComments(req.params.id);
      res.json(commentPost);
    }
  } catch (error) {
    res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
  }
});

module.exports = router;
