import { enterTxt, registerTxt } from "../config.js";

export const initEventListeners = (setUser) => {
    document.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target.id === "menu-toggle") {
            console.log('menu click');
            toggleClass(document.getElementById("menu-overlay"), "open");
            toggleClass(document.getElementById("menu"), "open");
        }
    });

    document.getElementById("create").addEventListener('click', (e) => {
        const txt = e.target.innerHTML === 'Создать' ? registerTxt : enterTxt;

        for (let key in txt) {
            const element = document.getElementById(key);
            if ( txt[key].innerHTML ) { element.innerHTML = txt[key].innerHTML; }
            if ( txt[key].style ) {
                const style = txt[key].style;
                for (let styleKey in style) {
                    element.style[styleKey] = style[styleKey];
                }
            }
        }
    })

    document.getElementById("enter").addEventListener('click', () => {
        const eMail = document.getElementById("e-mail").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("confirmation").value;
        if (passwordConfirm) {
            // Register
            if (passwordConfirm !== password) {
                alert('Password are different');
                return;
            }
            console.log('Register: ');
        } else {
            // Enter
            console.log('Enter');
        }


        setUser( {id: 0} );

        console.log('E-mail: ', eMail);
        console.log('Password: ', password);
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