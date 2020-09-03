/**
 * Application entry point
 */

// Load application styles
import "../assets/styles/index.scss";
// ================================
// START YOUR APP HERE
// ================================

//Swipe

const featuresListItems = [...document.querySelectorAll(".features-list__list-item")];

const contactNavbarListItem = [...document.querySelectorAll(".contact__navbar-item")];

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const featuresHeaders = [...document.querySelectorAll(".features-list__header")];
const featuresParagraphs = [...document.querySelectorAll(".features-list__paragraph")];
const featureContent = featuresHeaders.map((header, index) => {
    return {
        header: header,
        paragraph: featuresParagraphs[index],
    };
});

const featuresHeaderTemplate = document.querySelector(".features__header");
const featuresParagraphTemplate = document.querySelector(".features__paragraph");
const featuresTemplates = [featuresHeaderTemplate, featuresParagraphTemplate];

let ordinalNumber = 0;

const fadeOut = (templates) => {
    templates.forEach((template) => {
        template.style.opacity = 0;
        template.style.transition = "0.5s";
    });
};

const fadeIn = (templates) => {
    templates.forEach((template) => {
        template.style.opacity = 1;
    });
};

const ACTION_REMOVE_FOCUS_FROM_FEATURES_LIST = (listItems) => {
    const listItemWithClassToRemove = listItems.find((listItem) => listItem.querySelector(".features-list__active"));
    if (listItemWithClassToRemove) {
        listItemWithClassToRemove.querySelector(".features-list__active").classList.remove("features-list__active");
    }
};

const ACTION_SWITCH_CONTENT = (content) => {
    const header = content[ordinalNumber].header["textContent"];
    const paragraph = content[ordinalNumber].paragraph["textContent"];

    featuresHeaderTemplate.textContent = header;
    featuresParagraphTemplate.textContent = paragraph;
};

const ACTION_SWITCH_CONTENT_WITH_ANIMATION = (ACTION_SWITCH_CONTENT) => {
    fadeOut(featuresTemplates);

    setTimeout(() => ACTION_SWITCH_CONTENT(featureContent), 500);

    setTimeout(() => fadeIn(featuresTemplates), 500);
};

const ACTION_ORDINAL_NUMBER_UPDATE = (direction, content) => {
    switch (direction) {
        case "left":
            if (ordinalNumber === 0) {
                ordinalNumber = content.length - 1;
            } else {
                ordinalNumber -= 1;
            }
            break;

        case "right":
            if (ordinalNumber === content.length - 1) {
                ordinalNumber = 0;
            } else {
                ordinalNumber += 1;
            }
            break;

        default:
            ordinalNumber += 0;
            break;
    }
};

const ACTION_SWIPE = (direction) => {
    ACTION_ORDINAL_NUMBER_UPDATE(direction, featureContent);

    ACTION_SWITCH_CONTENT_WITH_ANIMATION(ACTION_SWITCH_CONTENT);

    ACTION_REMOVE_FOCUS_FROM_FEATURES_LIST(featuresListItems);
};

leftArrow.addEventListener("click", () => ACTION_SWIPE("left"));
rightArrow.addEventListener("click", () => ACTION_SWIPE("right"));

//Navbar tabs

const navbarTabs = [...document.querySelectorAll(".navbar-desktop__item")];

const ACTION_NAVBAR_FOCUS = (tab, navbarTabs) => {
    const tabToRemoveClass = navbarTabs.find((tab) => tab.classList.contains("nav-active-tab"));

    tabToRemoveClass.classList.remove("nav-active-tab");
    tab.classList.add("nav-active-tab");
};

navbarTabs.forEach((tab) => tab.addEventListener("click", () => ACTION_NAVBAR_FOCUS(tab, navbarTabs)));

//Features list

const ACTION_FEATURES_LIST_FOCUS = (listItem, listItems) => {
    const header = listItem.querySelector(".features-list__header");

    ACTION_REMOVE_FOCUS_FROM_FEATURES_LIST(featuresListItems);

    header.classList.add("features-list__active");

    ordinalNumber = listItems.indexOf(listItem);

    ACTION_SWITCH_CONTENT_WITH_ANIMATION(ACTION_SWITCH_CONTENT);
};

featuresListItems.forEach((listItem) => {
    listItem.addEventListener("click", () => ACTION_FEATURES_LIST_FOCUS(listItem, featuresListItems));
});

const ACTION_CONTACT_NAVBAR_FOCUS = (tab, tabs) => {
    const tabToRemoveClass = tabs.find((tab) => tab.classList.contains("contact-active-tab"));
    tabToRemoveClass.classList.remove("contact-active-tab");
    tab.classList.add("contact-active-tab");
};

contactNavbarListItem.forEach((tab) => tab.addEventListener("click", () => ACTION_CONTACT_NAVBAR_FOCUS(tab, contactNavbarListItem)));
