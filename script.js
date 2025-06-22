
async function fetchRepos() {
  const username = "ABHAYKUMARTRIPATHI";
  const repoList = document.getElementById("repo-list");
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
  const repos = await res.json();
  repoList.innerHTML = "";
  repos.forEach(repo => {
    if (!repo.fork) {
      const card = document.createElement("div");
      card.className = "repo-card";
      card.innerHTML = `<h3>${repo.name}</h3><p>${repo.description || "No description"}</p>
                        <a href="${repo.html_url}" target="_blank">View on GitHub</a>`;
      repoList.appendChild(card);
    }
  });
}
fetchRepos();
