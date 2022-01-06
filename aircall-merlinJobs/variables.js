/* move to next page */
const movePage = function() {
  const currentPage = this.parentNode.parentNode.id;
  if(this.className === 'next-page') {
    let nextPage = parseInt(currentPage.substr(currentPage.length - 1)) + 1;
    if(nextPage === 7) nextPage = document.getElementById('page-1').offsetTop;
    else nextPage = document.getElementById('page-' + nextPage).offsetTop;
    window.scrollTo({ top: nextPage,behavior: 'smooth'});
  } else {
    let previousPage = parseInt(currentPage.substr(currentPage.length - 1)) - 1;
    if(previousPage === 0) previousPage = document.getElementById('page-6').offsetTop;
    else previousPage = document.getElementById('page-' + previousPage).offsetTop;
    window.scrollTo({ top: previousPage,behavior: 'smooth'});
  };
};
const pages = function(pageType) {
  const pages = document.getElementsByClassName(pageType);
  for (x=0;x<pages.length;x++){
    document.getElementById(pages[x].id).addEventListener('click', movePage);
  };
};
const nextPages = pages("next-page");
const previousPages = pages("previous-page");

/* show/hide solution */
let collapsible = function(){
  const elementID = this.id + '-solution';
  console.log(elementID);
  const elementDisplay = document.getElementById(elementID);
  console.log(elementDisplay.style.display);
  if(elementDisplay.style.display === 'none'){
    elementDisplay.style.display = 'inline';
  } else {
    elementDisplay.style.display = 'none';
  }
};
window.onload = function() {
  const basicConfiguration = document.getElementById("basic-configuration").addEventListener("click",collapsible);
  const smartCallRouting = document.getElementById("smart-call-routing").addEventListener("click",collapsible);
  const welcomeMessage = document.getElementById("welcome-message").addEventListener("click",collapsible);
  const easyButton = document.getElementById("easy-button").addEventListener("click",collapsible);
  const aircallData = document.getElementById("air-call-data").addEventListener("click",collapsible);
  const pseudoCode = document.getElementById("pseudo-code").addEventListener("click",collapsible);

};
/* gantt chart */
function createChart(e) {
  const days = document.querySelectorAll(".chart-values li");
  const tasks = document.querySelectorAll(".chart-bars li");
  const daysArray = [...days];

  tasks.forEach(el => {
    const duration = el.dataset.duration.split("-");
    const startDay = duration[0];
    const endDay = duration[1];
    let left = 0,
      width = 0;

    if (startDay.endsWith("½")) {
      const filteredArray = daysArray.filter(day => day.textContent == startDay.slice(0, -1));
      left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
    } else {
      const filteredArray = daysArray.filter(day => day.textContent == startDay);
      left = filteredArray[0].offsetLeft;
    }

    if (endDay.endsWith("½")) {
      const filteredArray = daysArray.filter(day => day.textContent == endDay.slice(0, -1));
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - left;
    } else {
      const filteredArray = daysArray.filter(day => day.textContent == endDay);
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left;
    }

    // apply css
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    if (e.type == "load") {
      el.style.backgroundColor = el.dataset.color;
      el.style.opacity = 1;
    }
  });
}

window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);