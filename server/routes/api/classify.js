const express = require("express");
const router = express.Router();
const axios = require('axios');
const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const headers = {"Authorization": "Bearer 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"};

const disciplines = ["technology", "business", "science", "humanities"];
const disciplineCounts = {};
disciplines.forEach(discipline => disciplineCounts[discipline] = 0);

const query = async (sentence) => {
  const response = await axios.post(API_URL, 
    { "inputs": sentence, "parameters": {"candidate_labels": disciplines} },
    { headers }
  );
  return response.data;
}

router.post("/", async (req, res) => {
  const { content } = req.body;
  // assuming paragraphs are separated by two newline characters
  const paragraphs = content.split('\n\n');
  // array to store disciplines in each paragraph
  const paragraphDisciplines = [];
  let totalSentences = 0;

  for(const paragraph of paragraphs) {
    const sentences = paragraph.split(/(?<=[.!?])\s+(?=[A-Z])/);
    // keeping track of disciplines in current paragraph
    const currentParagraphDisciplines = new Set();
    for (const sentence of sentences) {
      const result = await query(sentence);
      const maxScore = result.scores[0];
      // Loop over all labels and scores
      for (let i = 0; i < result.labels.length; i++) {
        // Check if the score is within 50% of the max score
        if (result.scores[i] >= 0.5 * maxScore) {
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
  for(const discipline in disciplineCounts) {
    percentages[discipline] = ((disciplineCounts[discipline] / totalSentences) * 100).toFixed(2);
  }
  const DGI = (Object.keys(disciplineCounts).length / paragraphs.length).toFixed(2);

  //calculating DII
  const multiDisciplinaryParagraphs = paragraphDisciplines.filter(disciplines => disciplines.size > 1);
  const DII = (multiDisciplinaryParagraphs.length / paragraphs.length).toFixed(2);

  let sumDisciplines = 0;
  for (const discipline in disciplineCounts) {
    sumDisciplines += disciplineCounts[discipline];
  }

  let DEI = 0;
  for (const discipline in disciplineCounts) {
    let fraction = disciplineCounts[discipline] / sumDisciplines;
    DEI += fraction ** 2;
  }
  DEI = (1 - DEI).toFixed(2);
  
  const responseMetrics = {
    "essayMetrics": {
      "numParagraphs": paragraphs.length,
      "DGI": DGI,
      "DII": DII,
      "DEI": DEI
    },
    "paragraphMetrics": {
      "numMultiDisciplinaryParagraphs": multiDisciplinaryParagraphs.length
    },
    "disciplineMetrics": {
      "total": sumDisciplines
    }
  };

  disciplines.forEach((discipline) => {
    responseMetrics["disciplineMetrics"][discipline] = {
      "count": disciplineCounts[discipline],
      "percentage": percentages[discipline]
    };
  });

  res.json(responseMetrics);
});

module.exports = router;
