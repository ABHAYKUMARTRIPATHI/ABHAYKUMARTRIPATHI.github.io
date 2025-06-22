document.addEventListener("DOMContentLoaded", function () {
  const username = "ABHAYKUMARTRIPATHI";
  const repoList = document.getElementById("repo-list");

  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(response => response.json())
    .then(repos => {
      repoList.innerHTML = ""; // Clear loading message
      repos.forEach(repo => {
        if (!repo.fork) {
          const card = document.createElement("div");
          card.className = "repo-card";
          card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description provided."}</p>
            <a href="${repo.html_url}" target="_blank">🔗 View on GitHub</a>
          `;
          repoList.appendChild(card);
        }
      });
    })
    .catch(error => {
      console.error("GitHub API error:", error);
      repoList.innerHTML = "<p>⚠️ Failed to load projects. Please try again later.</p>";
    });
});
