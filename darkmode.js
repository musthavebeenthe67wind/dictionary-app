let darkmode = localStorage.getItem('darkmode');
const themeSwtich = document.getElementById("theme-switch");

function enableDarkmode() {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

function disableDarkmode() {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode();

themeSwtich.addEventListener("click", ()=> {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()  
})