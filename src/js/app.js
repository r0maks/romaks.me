
import '../css/style.scss';
var tab = 1;
var tabPrefix = 'tab-';
function changeTab(tabIndex) {
    hideElement(tabPrefix + tab);
    tab = tabIndex;
    console.log(tab);
    showElement(tabPrefix + tabIndex);
}
function showElement(elemId) {
    let elem = document.getElementById(elemId);
    if (elem) {
        elem.style.display = elem.style.displayLast;
    }
}
function hideElement(elemId) {
    let elem = document.getElementById(elemId);
    if (elem) {
        elem.style.displayLast = elem.style.display;
        elem.style.display = 'none';
    }
}