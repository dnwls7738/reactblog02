const router = require("express").Router();
const Post = require("../models/Post");

//포스트 만들기
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//포스트 수정하기
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("본인의 게시글만 삭제 할 수 있습니다.");
    }
  } catch (err) {
    res.status(404).json("게시글이 없습니다.");
  }
});

//포스트 삭제하기
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("게시글이 삭제되었습니다.");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("본인의 게시글만 삭제 할 수 있습니다.");
    }
  } catch (err) {
    res.status(404).json("게시글이 없습니다.");
  }
});

//포스트 가져오기
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//모든 포스트 가져오기
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catname = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catname) {
      posts = await Post.find({
        categories: {
          $in: [catname],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
