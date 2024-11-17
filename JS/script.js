var activePopup; 
var activeLanguage;
var activeMenu;
var intervalId;

var popupId;
 
const element = document.querySelector('.going_top');
const element01 = document.querySelector('.logo');

const language_button = document.querySelector('.language_button');

const slideWrappers = document.querySelectorAll(".slide-wrapper");


//==================Tabs============================
function openTab(tabName, popup) {

  var tabs = document.querySelectorAll('#' + popup + ' .tab');
    tabs.forEach(function(tab) {
      tab.classList.add('inactive');
    });

  var selectedTab = document.querySelector('#' + popup + ' > #' + tabName);
  selectedTab.classList.remove('inactive'); 
}

//================================================================

/*
function startInterval(slidesContainer, slide) {
  intervalId = setInterval(function() {
    const slideWidth = slide.clientWidth;
    const containerWidth = slidesContainer.clientWidth;
    if (slidesContainer.scrollLeft + containerWidth >= slidesContainer.scrollWidth-5) {
      slidesContainer.scrollLeft = 0;
    } else {
      slidesContainer.scrollLeft += slideWidth;
    }
  }, 60000);
}

function stopInterval() {
  clearInterval(intervalId);
}
*/

slideWrappers.forEach((slideWrapper) => {
  var slidesContainer = slideWrapper.querySelector(".slides-container");
  var slide = slideWrapper.querySelector(".slide");
  const prevButton = slideWrapper.querySelector(".slide-arrow-prev");
  const nextButton = slideWrapper.querySelector(".slide-arrow-next");


  nextButton.addEventListener("click", () => {
    //stopInterval();
    const slideWidth = slide.clientWidth;
    const containerWidth = slidesContainer.clientWidth;
    const maxScrollLeft = slidesContainer.scrollWidth - containerWidth;
    if (slidesContainer.scrollLeft + containerWidth >= slidesContainer.scrollWidth-5) {
      slidesContainer.scrollLeft = 0;
      
    } else {
      slidesContainer.scrollLeft += slideWidth;
    }
    if (activePopup) {
      //stopInterval();
      //startInterval(slidesContainer, slide);
    }
  });

  prevButton.addEventListener("click", () => {
    //stopInterval();
    const slideWidth = slide.clientWidth;
    const containerWidth = slidesContainer.clientWidth;
    const maxScrollLeft = slidesContainer.scrollWidth - containerWidth;
    if (slidesContainer.scrollLeft <= 0) {
      slidesContainer.scrollLeft = maxScrollLeft;
    } else {
      slidesContainer.scrollLeft -= slideWidth;
    }
    if (activePopup) {
      //stopInterval();
      //startInterval(slidesContainer, slide);
    }
  });
});


function openPopup(element, popupId) {
  if(popupId === 'navigation_menu'){

    closeActivePopup();
    const popup = document.getElementById('navigation_menu');
    popup.classList.add('active_navigation');
    activePopup = popup; 
    activeMenu = popup;
    checkScreenSize();
  }else if(popupId === 'language'){
    const popup = document.getElementById('language');
    popup.classList.add('active_language');
    activeLanguage = popup;
  }else{

    closeActivePopup();
    const activeDiv = document.getElementById(popupId);
    const rect = element.getBoundingClientRect();
    const {top, left, width, height } = rect;
    
    activeDiv.classList.add('active');

    var activeElements = document.querySelectorAll('.active > *');
      activeElements.forEach(function(variable, ) {
        variable.classList.add('hidden');
      });

    activeDiv.style.top = top + 'px';
    activeDiv.style.left = left + 'px';
    activeDiv.style.width = width + 'px';
    activeDiv.style.height = height + 'px';

    setTimeout(function() {
      var activeElements = document.querySelectorAll('.active > *');
      activeElements.forEach(function(variable, ) {
        variable.classList.remove('hidden');   
      });
    }, 600);

    activePopup = activeDiv; 
  }
  
  setTimeout(function() {
    document.addEventListener('click', outsideClick);
  }, 100);
}

//Fechar popup manualmente 
function closePopup(popupId) {
  //stopInterval();
  var activeElements = document.querySelectorAll('.active > *');
  activeElements.forEach(function(variable) {
    variable.classList.add('hidden');
  });
  if(activeLanguage){
    activeLanguage.classList.remove('active_language');
    activeLanguage = null;
  }
    const popup = document.getElementById(popupId);
    popup.classList.remove('active');
    popup.classList.remove('active_navigation');
    activePopup = null;
    activeMenu = null;
    document.removeEventListener('click', outsideClick);
    checkScreenSize();
}

//Fechar popup se um outro estiver abrindo
function closeActivePopup(){
  //stopInterval();
  var activeElements = document.querySelectorAll('.active > *');
  activeElements.forEach(function(variable) {
  variable.classList.add('hidden');
  });
  if (activePopup != null) {
    if(activeLanguage){
      activeLanguage.classList.remove('active_language');
      activeLanguage = null;
    }
    document.removeEventListener('click', outsideClick);
    activePopup.classList.remove('active');
    activePopup.classList.remove('active_navigation');
    activePopup = null;
    activeMenu = null;
    checkScreenSize();
  }
}


//Clique fora do popup
function outsideClick(event){
  if(activeMenu && !document.getElementById('language').contains(event.target) && !language_button.contains(event.target) && activeLanguage){
    document.getElementById('language').classList.remove('active_language');
    activeLanguage = null;
  }else if(!document.getElementById('language').contains(event.target) && !language_button.contains(event.target) && activeLanguage){
    document.getElementById('language').classList.remove('active_language');
    document.removeEventListener('click', outsideClick);
    activeLanguage = null;
  }

  if (!activePopup.contains(event.target)) {
    closeActivePopup();
  }
}


//redimensionamento no mobile
window.addEventListener('resize', checkScreenSize);
function checkScreenSize() {
  if(activeMenu && !window.matchMedia("(min-width: 565px)").matches ){
    element.style.bottom = '260px';
    element01.style.right = '-60px';
  }if(!activeMenu && !window.matchMedia("(min-width: 565px)").matches || window.matchMedia("(min-width: 565px)").matches && window.matchMedia("(max-width: 950px)").matches){
    element.style.bottom = '80px';
    element01.style.right = '15px';
  }
  if(window.matchMedia("(min-width: 950px)").matches){
    element.style.bottom = '15px';
  }
}