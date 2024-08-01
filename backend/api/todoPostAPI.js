const express = require("express");
const postModel = require("../models/postSchema");
const groupeModel = require("../models/groupSchema");
const route = express();

route.post("/createGroup", async (req, res) => {
  const { groupName, color } = req.body;
  const findGroup = await groupeModel.findOne({ groupName });
  if (findGroup) {
    console.log(findGroup);
    return res.status(400).json({ msg: "Group already exists" });
  }
  try {
    const newGroup = new groupeModel({ groupName, color });
    await newGroup.save();
    console.log(newGroup);
    res.status(200).json({ msg: "group is created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error hai kuchh" });
  }
});

route.get("/allGroupsData", async (req, res) => {
  try {
    const allGroups = await groupeModel.find().populate("posts");
    res.status(200).json({ data: allGroups });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

route.post("/savePost", async (req, res) => {
  const { postText, groupId } = req.body;
  const findGroup = await groupeModel.findById(groupId);
  if (!findGroup) {
    return res.status(400).json({ msg: "group not found" });
  }
  try {
    const newPost = new postModel({ description: postText, groupId });
    await newPost.save();
    findGroup.posts.push(newPost._id);
    await findGroup.save();
    console.log(newPost);
    res.status(200).json({ msg: "post has been created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});
route.delete("/deletePost", async (req, res) => {
  const { postId } = req.body;
  const findPost = await postModel.findByIdAndDelete(postId);
  if (!findPost) {
    return res.status(400).json({ msg: "post not found" });
  }
  const findGroup = await groupeModel.findById(findPost.groupId);
  try {
    findGroup.posts = findGroup.posts.filter((item) => item.toString() !== postId);
    await findGroup.save();
    res.status(200).json({ msg: "post is deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = route;
