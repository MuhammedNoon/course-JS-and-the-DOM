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

const sectionList = document.querySelectorAll('section');
const navbarList = document.querySelector('#navbar__list');
const topButtonList = document.querySelectorAll('.top__button');
const footer = document.querySelector('footer');
const header = document.querySelector('.page__header');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to check if the given section is in the viewport
let checkViewport = sec => {
    const rect = sec.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        // following two fallbacks if browser does not support the first option (given by www.javascripttutorial.net)
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// show Go to Top button if parent section is in the viewport
let showButton = buttonList => {
    for (const button of buttonList) {
        checkViewport(button.parentElement) ? button.style.display = 'block' : button.style.display = 'none';
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// function to build list items with given section list and navigation list
let buildListItems = (secList, navList) => {
    //for..of loop to create list item for every item in the secList and attach to the given navList
    for (const sec of secList) {
        const newElement =
            `<li data-link=${sec.getAttribute('id')} class="menu__link">
                <a href="#${sec.getAttribute('id')}">${sec.getAttribute('data-nav')}</a>
            </li>`;
        navList.insertAdjacentHTML('beforeend', newElement);
    }
}

// Add class 'active' to section when in recent view position
let setActiveSection = secList => {
    for (const sec of secList) {
        //classical if-else for readability
        if (checkViewport(sec)) {
            sec.classList.toggle('active', true);
            document.querySelector(`[data-link="${sec.getAttribute('id')}"]`).classList.toggle('active', true);
        }
        else {
            sec.classList.toggle('active', false);
            document.querySelector(`[data-link="${sec.getAttribute('id')}"]`).classList.toggle('active', false);
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.onload = () => buildListItems(sectionList, navbarList);

// Scroll smoothly to section on link click
navbarList.addEventListener('click', event => {
    event.preventDefault();
    const clickedSection = event.target.hasAttribute('data-link')
    ? event.target
    : event.target.parentElement;
    const sectionToScroll = document.querySelector(`#${clickedSection.getAttribute('data-link')}`);
    // scrollIntoView with options not supported in Safari Browser
    sectionToScroll.scrollIntoView({block: 'center', behavior: 'smooth'});
});

// Go to top of the page on button click
for (const button of topButtonList) {
    button.addEventListener('click', () =>
        // scrollTo with behavior not supported in Safari Browser
        window.scrollTo({top: 0, behavior: 'smooth'})
    );
}

// Set sections as active AND show Go to Top button on scroll
window.onscroll = () => {
    setActiveSection(sectionList);
    showButton(topButtonList);
};