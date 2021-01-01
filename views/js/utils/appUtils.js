export const initEventListeners = (App) => {
    document.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target.id === "menu-toggle") {
            console.log('menu click');
            toggleClass(document.getElementById("menu-overlay"), "open");
            toggleClass(document.getElementById("menu"), "open");
        }
    });
}

const toggleClass = (element, className) => {
    if (!element || !className){
        return;
    }
    let classString = element.className, nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += ' ' + className;
    }
    else {
        classString = classString.substr(0, nameIndex - 1) + classString.substr(nameIndex+className.length);
    }
    element.className = classString;
}

export const menuOff = () => {
    document.getElementById("menu-overlay").className =
        document.getElementById("menu-overlay").className.split(' ')[0];
    document.getElementById("menu").className =
        document.getElementById("menu").className.split(' ')[0];
}