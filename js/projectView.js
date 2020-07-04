function trimName(name, maxChars = 50) {
  if (name.length > maxChars) {
    return name.substring(0, maxChars) + ' ...';
  }
  return name;
}

function deletePaper(paperPos, sectionPos) {
  const project = getProjectFromUrl();

  project.sections[sectionPos].papers.splice(paperPos, 1);
  if (project.sections[sectionPos].papers.length === 0) {
    project.sections.splice(sectionPos, 1);
  }
  window.localStorage.setItem(project.projectId, JSON.stringify(project));
  renderProject(project);
}

function updateCheckboxes(cb, paperPos, sectionPos) {
  const project = getProjectFromUrl();

  const id = cb.id;
  const slicedId = id.split('-');
  const order = parseInt(slicedId[slicedId.length - 2]);
  const paper = slicedId.slice(0, slicedId.length - 2).join('-');

  project.sections[sectionPos].papers[paperPos].understanding[order] = cb.checked;

  if (cb.checked) {
    for (let i = 0; i <= order; i++) {
      $(`#${paper}-${i}-checkbox`).prop('checked', cb.checked);
      project.sections[sectionPos].papers[paperPos].understanding[i] = cb.checked;
    }
  } else {
    for (let i = order; i < 5; i++) {
      $(`#${paper}-${i}-checkbox`).prop('checked', cb.checked);
      project.sections[sectionPos].papers[paperPos].understanding[i] = cb.checked;
    }
  }
  window.localStorage.setItem(project.projectId, JSON.stringify(project));
  renderProject(project);
}

function paperHtml(paper, paperPos, sectionPos) {
  const paperId = paper.name.toLowerCase().replace(/ /g, "-");

  const checkboxes = paper.understanding.map((u, i) => {
    return `
    <td class="text-right">
      <input type="checkbox" class="text-right form-check-input" 
        id="${paperId}-${i}-checkbox" ${u ? "checked" : ""} 
        onclick="updateCheckboxes(this, ${paperPos}, ${sectionPos})">
    </td>`;
  }).join(' ');

  const paperRow = `
    <tr>
      <td><a href=${paper.link}>${trimName(paper.name)}</a></td>
      ${checkboxes}
    <td class="text-right">
      <button class="btn-sm btn btn-outline btn-outline-danger"
        onclick="deletePaper(${paperPos}, ${sectionPos})">Delete
      </button>
    </td>
    <tr>`

  return paperRow;
}

function renderProject(project) {
  $('.project-title').html(project.name);
  
  const sectionsContainer = $('.papers-container');
  const sections = project.sections;
  sectionsContainer.empty();

  sections.forEach((s, si) => {
    const sectionTableHeader = `
      <thead>
        <tr>
          <th scope="col"><i class="mr-1 fas fa-scroll"></i>${s.name} - Resources</th>
          <th scope="col"><i class="mr-1 far fa-check-square"></i> 10 - 20%</th>
          <th scope="col"><i class="mr-1 far fa-check-square"></i> 20 - 40%</th>
          <th scope="col"><i class="mr-1 far fa-check-square"></i> 40 - 60%</th>
          <th scope="col"><i class="mr-1 far fa-check-square"></i> 60 - 80%</th>
          <th scope="col"><i class="mr-1 far fa-check-square"></i> 80 - 100%</th>
          <th scope="col"></th>
        </tr>
      </thead>
    `;
    
    // Generate rows string, a row corresponds to a single paper
    const rows = s.papers.map((p, i) => paperHtml(p, i, si)).join(' ');

    sectionsContainer.append(`<table class="table">
      ${sectionTableHeader} 
      <tbody>${rows}</tbody>
    </table>`);
  });
}

$(document).ready(() => {
  const project = getProjectFromUrl();

  if (project === undefined || project === null) {
    // TODO: Redirect to error
  } else {    
    document.title = "Project - " + project.name;
    renderProject(project);
    $("#add-paper-btn").click(() => {
      window.location.href = 'create-paper.html?project-id=' + project.projectId;
    })
  }
});