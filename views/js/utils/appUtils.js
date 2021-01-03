export const initEventListeners = (App) => {
    document.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target.id === "menu-toggle") {
            console.log('menu click');
            toggleClass(document.getElementById("menu-overlay"), "open");
            toggleClass(document.getElementById("menu"), "open");
        }
    });
    const create = document.getElementById('create');
    const creature = document.getElementById('creature')
    const block = document.getElementById('block')
    const confirmation = document.getElementById('confirmation')
    const enter = document.getElementById('enter')
    const registration = document.getElementById('registration')
    create.addEventListener('click', () => {
        creature.style.display = 'none';
        block.style.display = 'block'
        confirmation.style.display = 'block'
        enter.style.display = 'none'
        registration.style.display = 'block'
    })
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

export const loaderOn = () => {
    document.getElementById("loader").style.display = 'flex';
    document.getElementById("root").style.display = 'none';
}

export const loaderOff = () => {
    document.getElementById("loader").style.display = 'none';
    document.getElementById("root").style.display = 'block';
}