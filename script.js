document.addEventListener("DOMContentLoaded", () => {
  const username = "ABHAYKUMARTRIPATHI";
  const repoList = document.getElementById("repo-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const customCategories = {
    "CloudBucketScanner": "Tools",
    "virustotal_scanner": "AI/ML",
    "malicious-url-blocker": "Tools",
    "MAC_Spoofing_Detector": "Networking",
    "DiskImageAnalyzer": "Forensics",
    "log-timeline-generator": "Forensics",
    "MetadataExtractor": "Forensics",
    "FaceRecognitionFileLocker": "AI/ML",
    "WiFi_DoS_Detector_Enhanced": "Networking",
    "URL_Screenshot_Analyzer": "AI/ML"
  };

  let allRepos = [];

  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
      allRepos = repos.filter(repo =>
        !repo.fork && repo.name !== `${username}.github.io` && customCategories[repo.name]
      );
      renderRepos("all");
    });

  function renderRepos(category) {
    repoList.innerHTML = "";
    let filtered = allRepos;
    if (category !== "all") {
      filtered = allRepos.filter(r => customCategories[r.name] === category);
    }

    filtered.slice(0, 12).forEach(repo => {
      const desc = repo.description ? repo.description.slice(0, 200) : "No description provided.";
      const card = document.createElement("div");
      card.className = "repo-card";
      card.setAttribute("data-aos", "fade-up");
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${desc}${repo.description && repo.description.length > 200 ? "..." : ""}</p>
        <a href="${repo.html_url}" target="_blank">🔗 View on GitHub</a>
      `;
      repoList.appendChild(card);
    });

    const moreNote = document.createElement("p");
    moreNote.className = "more-projects-note";
    moreNote.innerHTML = `🚀 And many more on <a href="https://github.com/${username}" target="_blank">GitHub</a>...`;
    repoList.appendChild(moreNote);

    AOS.refresh(); // Re-initialize animations after dynamic content
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      renderRepos(category);
    });
  });

  // Theme Toggle
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  // Typed.js animation for name/title
  new Typed("#typed", {
    strings: [
      "Abhay Kumar Tripathi",
      "Cybersecurity Developer",
      "AI/ML Enthusiast",
      "Open Source Contributor"
    ],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
  });

  // Init AOS
  AOS.init({ duration: 1000 });
});
