document.getElementById("matchBtn").addEventListener("click", function () {
  const resume = document.getElementById("resume").value.toLowerCase();
  const job = document.getElementById("job").value.toLowerCase();

  if (!resume || !job) {
    alert("Please paste both your resume and the job description.");
    return;
  }

  const stopWords = [
    "the", "and", "for", "with", "you", "your", "our", "will", "are", "have",
    "this", "that", "from", "they", "their", "about", "into", "using", "work",
    "role", "job", "team", "teams", "candidate", "candidates", "experience",
    "years", "year", "ability", "skills", "skill", "strong", "excellent", "good"
  ];

  function getWords(text) {
    return text
      .replace(/[^a-z0-9+#. ]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
  }

  const resumeWords = new Set(getWords(resume));
  const jobWords = getWords(job);

  const jobKeywordCounts = {};
  jobWords.forEach(word => {
    jobKeywordCounts[word] = (jobKeywordCounts[word] || 0) + 1;
  });

  const matched = [];
  const missing = [];

  Object.keys(jobKeywordCounts).forEach(word => {
    if (resumeWords.has(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const score = Math.round(
    (matched.length / Object.keys(jobKeywordCounts).length) * 100
  );

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").textContent = score + "% match";

  document.getElementById("matched").innerHTML = matched
    .slice(0, 40)
    .map(word => `<span class="keyword matched">${word}</span>`)
    .join("");

  document.getElementById("missing").innerHTML = missing
    .slice(0, 40)
    .map(word => `<span class="keyword missing">${word}</span>`)
    .join("");
});
