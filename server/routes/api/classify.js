const express = require("express");
const router = express.Router();
const axios = require("axios");

const { User } = require("./../../models");
const API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const headers = {
  Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
};

const disciplines = ["technology", "business", "science", "humanities"];

// Custom rounding function to round to a specific number of decimal places
function roundDecimal(num, places) {
  const rounded = Math.round(num * 10 ** places) / 10 ** places;
  // console.log(num, "is now ", rounded, " rounded to ", places, " places.");
  return rounded;
}

const query = async (sentence) => {
  const response = await axios.post(
    API_URL,
    { inputs: sentence, parameters: { candidate_labels: disciplines } },
    { headers }
  );
  return response.data;
};

router.post("/", async (req, res) => {
  const disciplineCounts = {};
  disciplines.forEach((discipline) => (disciplineCounts[discipline] = 0));

  try {
    const { postId, userId, content } = req.body;
    // assuming paragraphs are separated by two newline characters
    const paragraphs = content.split(/\n+/);
    // array to store disciplines in each paragraph
    const paragraphDisciplines = [];
    let totalSentences = 0;

    for (const paragraph of paragraphs) {
      const sentences = paragraph.split(/(?<=[.!?])\s+(?=[A-Z])/);
      const currentParagraphDisciplines = new Set();

      // Create an array of promises
      const promises = sentences.map((sentence) => query(sentence));

      // Await all promises to resolve
      const results = await Promise.all(promises);

      for (const result of results) {
        const maxScore = result.scores[0];
        for (let i = 0; i < result.labels.length; i++) {
          if (result.scores[i] >= 0.6 * maxScore) {
            const discipline = result.labels[i];
            disciplineCounts[discipline] += 1;
            currentParagraphDisciplines.add(discipline);
          }
        }
        totalSentences += 1;
      }
      paragraphDisciplines.push(currentParagraphDisciplines);
    }

    // calculating percentage of each discipline
    const percentages = {};
    // console.log(disciplineCounts)
    const totalClassified = Object.values(disciplineCounts).reduce(
      (a, b) => a + b,
      0
    );
    console.log(totalClassified);
    for (const discipline in disciplineCounts) {
      percentages[discipline] = roundDecimal(
        (disciplineCounts[discipline] / totalClassified) * 100,
        2
      );
    }
    // FIX BUG WHERE DISCIPLINE >= 1
    const uniqueDisciplines = Object.keys(disciplineCounts).length;
    const DGI = roundDecimal((uniqueDisciplines / paragraphs.length) * 100, 2);

    //calculating DII
    const multiDisciplinaryParagraphs = paragraphDisciplines.filter(
      (disciplines) => disciplines.size > 1
    );
    const DII = roundDecimal(
      (multiDisciplinaryParagraphs.length / paragraphs.length) * 100,
      2
    );

    let sumDisciplines = 0;
    for (const discipline in disciplineCounts) {
      sumDisciplines += disciplineCounts[discipline];
    }

    let DEI = 0;
    for (const discipline in disciplineCounts) {
      let fraction = disciplineCounts[discipline] / sumDisciplines;
      DEI += fraction ** 2;
    }
    DEI = roundDecimal((1 - DEI) * 100, 2);

    const responseMetrics = {
      essayMetrics: {
        numUniqueDisciplines: uniqueDisciplines,
        numParagraphs: paragraphs.length,
        DGI: DGI,
        DII: DII,
        DEI: DEI,
      },
      paragraphMetrics: {
        numMultiDisciplinaryParagraphs: multiDisciplinaryParagraphs.length,
      },
      disciplineMetrics: {
        total: sumDisciplines,
      },
    };

    disciplines.forEach((discipline) => {
      responseMetrics["disciplineMetrics"][discipline] = {
        count: disciplineCounts[discipline],
        percentage: percentages[discipline],
      };
    });
    //updating backend
    let user;
    try {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return res.status(500).send({
        success: false,
        message: "Error retrieving user from the database.",
      });
    }
    let post;
    try {
      post = user.posts.id(postId);
      if (!post) {
        return res.status(404).send({
          success: false,
          message: "Post not found",
        });
      }
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return res.status(500).send({
        success: false,
        message: "Error retrieving post from the database.",
      });
    }

    // Append the scores to the post
    post.scores = responseMetrics;

    // Save the changes made to the user document
    await user.save();

    // Return a success response
    res.json({ success: true, message: "Scores saved successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error classifying post." + err,
    });
  }
});

module.exports = router;
