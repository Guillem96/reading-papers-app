function updateInput(selected) {
  $("#section-input").attr("value", selected.text);
}

function renderSections(sections) {
  sections.forEach(s => {
    $('.dropdown-menu').append(`
      <a class="dropdown-item" onclick="updateInput(this)">${s}</a>
    `)
  });
}

$(document).ready(() => {
  const project = getProjectFromUrl();
  const sections = project.sections.map(p => p.name);

  if (project === undefined || project === null) {
    // TODO: Redirect to error
  } else {
    document.title = "Add paper - " + project.name;
    $(".project-title").html("Add paper on " + project.name);
    renderSections(sections);
  
    $("#add-btn").click(() => {
      const name = $("#paper-name").val();
      const link = $("#paper-link").val();
      const section = $("#section-input").val();
      const sectionIdx = sections.indexOf(section);
      const paper = {
        name,
        link,
        understanding: [false, false, false, false, false],
      };
      
      if (sectionIdx === -1) {
        project.sections.push({
          name: section,
          papers: [paper],
        })
      } else {
        project.sections[sectionIdx].papers.push(paper);
      }
      window.localStorage.setItem(project.projectId, JSON.stringify(project));
      window.location.href = "project-view.html?project-id=" + project.projectId;
    });
  
    $("#cancel-btn").click(() => {
      window.location.href = "project-view.html?project-id=" + project.projectId;
    });
  }


});