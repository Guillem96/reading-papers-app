function getProjects() {
  // const projectsJSON = window.localStorage.getItem('projects');
  // return JSON.parse(projectsJSON);
  return [
    {
      name: "Action Recognition Deep Learning",
      tags: [
        {
          name: "Deep Learning",
          color: "#ff0000"
        }, 
        { 
          name: "AI",
          color: "#00ff00"
        }
      ]
    }
  ]
}

function getProjectFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectId = urlParams.get("project-id");
  const project = getProjectData(projectId);
  project.projectId = projectId;
  return project;
}

function getProjectData(projectId) {
  const projectJSON = window.localStorage.getItem(projectId);
  return JSON.parse(projectJSON);

  // return {
  //   name: "Action Recognition Deep Learning",
  //   sections: [{
  //       name: "Feature Engineering",
  //       papers: [{
  //           name: "Action Recognition by Dense Trajectories",
  //           link: "https://hal.inria.fr/inria-00583818/document",
  //           metadata: {},
  //           understanding: [false, false, false, false, false]
  //         },
  //         {
  //           name: "Action Recognition with Improved Trajectories",
  //           link: "https://www.cv-foundation.org/openaccess/content_iccv_2013/papers/Wang_Action_Recognition_with_2013_ICCV_paper.pdf",
  //           metadata: {},
  //           understanding: [true, true, true, false, false]
  //         },
  //       ]
  //     },
  //     {
  //       name: "Datasets",
  //       papers: [{
  //           name: "Kinetics",
  //           link: "https://deepmind.com/research/open-source/kinetics",
  //           metadata: {},
  //           understanding: [false, false, false, false, false]
  //         },
  //       ]
  //     },
  //     {
  //       name: "Models",
  //       papers: [{
  //           name: "Large-scale Video Classification with Convolutional Neural Networks",
  //           link: "https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/42455.pdf",
  //           metadata: {
  //             authors: "Andrej Karpathy"
  //           },
  //           understanding: [false, false, false, false, false]
  //         },
  //       ]
  //     },
  //   ]
  // }
}
  