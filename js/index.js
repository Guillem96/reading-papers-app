
function renderProjects(projects) {
  const container = $(".projects-container");

  projects.forEach(p => {
    const projectId = p.name.toLowerCase().replace(/ /g, "-");
    container.append(`
      <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${p.name} Level of understanding</h6>
          <a href="html/project-view.html?project-id=${projectId}" class="card-link">View project</a>
          <a href="#" class="card-link danger">Delete Project</a>
          </div>
        </div>
      </div>
    `);
  });
}

$(document).ready(() => {
  const projects = getProjects();
  window.localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects(projects);
});