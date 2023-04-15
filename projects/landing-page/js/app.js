/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/
const v_navbar = document.querySelector('#navbar__list')
const v_section_list = Array.from(document.querySelectorAll('section'));
let active_section = v_section_list[0];
let v_dc_list = [];


// build the nav

// Loop through the section array using a for...of loop ro build the nav bar
document.addEventListener("DOMContentLoaded", function() {
  // Run the nav creation for loop once the document content is loaded
  for (const section of v_section_list) {
    // for each section, add its name to the nav bar with the menu__link class, also add div used to indicate active section
    const v_new_li = document.createElement('li');
    v_new_li.innerHTML = `<div id="${section.id}_div" class="link__container"><a href="${section.id}" class="menu__link">${section.dataset.nav}</a></div>`
    v_navbar.appendChild(v_new_li);
  };
  // assign the list of div link containers to an array used for indicating active section
  v_dc_list = Array.from(document.querySelectorAll('.link__container'));
  // assign the default active link to the first section link of the array
  v_dc_list[0].classList.add("active__link");
});


// Loop through the section array using a for...of loop to assign links to the nav bar
document.addEventListener("DOMContentLoaded", function() {
  // Update nav links for each section
  for (const section of v_section_list) {
    // for each section link, add an envent listener when clicked
    const v_new_a = document.querySelector(`a[href="${section.id}"]`);
    v_new_a.addEventListener('click', function(event) {
      // Prevent the default link behavior
      event.preventDefault();
    
      // Get the section element to scroll to
      const v_section = document.querySelector(`#${section.id}`);
    
      // Scroll to the section using the scrollIntoView() method
      v_section.scrollIntoView({ behavior: 'smooth' });
    });
  };
});

// Add class 'active' to section and link container when near top of viewport

document.addEventListener("scroll", function() {
  // Run the active section checker when scrolling
  for (const section of v_section_list) {
    const rect = section.getBoundingClientRect();
    // determine if a different section needs to be assigned as the active section
    if (rect.top <= 1 && rect.bottom > 1 && section !== active_section) {
      // remove the active class from the current active section and assign to the new active section
      active_section.classList.remove("active_sect");
      active_section = section;
      active_section.classList.add("active_sect");
      // update the active link on the nav bar
      for (const dc of v_dc_list){
        const id = dc.getAttribute("id");
        if (id === `${active_section.id}_div`) {
          dc.classList.add("active__link")
        }
        else {
          dc.classList.remove("active__link")
        }
      }
    }
  };
});



