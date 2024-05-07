let SummarizerManager = require("node-summarizer").SummarizerManager;

const summarize = (text, senti) => {
  let text_to_summarize = text;
  let number_of_sentences = senti;
  let Summarizer = new SummarizerManager(
    text_to_summarize,
    number_of_sentences
  );
  let summary = Summarizer.getSummaryByFrequency().summary;
  return summary;
};

module.exports = summarize;
