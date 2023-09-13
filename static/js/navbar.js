const icon = document.querySelector('.drawer-icon');
const menuList = document.querySelector('nav ul')
const items = document.querySelectorAll('nav a')
const menu = document.querySelector('nav')

icon.addEventListener('click', () => {
    menuList.classList.toggle('open')
    icon.classList.toggle('open')
})

items.forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector(item.hash).scrollIntoView()
        icon.classList.remove('open')
        menuList.classList.remove('open')
    })
})

let isDragging = false;
let offsetY = 0;
let newY = null;


menuList.addEventListener("touchstart", (e) => {
    isDragging = true;
    menu.style.transition = "none";
    const touch = e.touches[0];
    offsetY = touch.clientY - menu.getBoundingClientRect().top;
});

menuList.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    newY = touch.clientY - offsetY;
    if (newY < 0) {
    
        menuList.style.transform = `translateY(${newY}px)`;
    }
});

menuList.addEventListener("touchend", () => {
    if (isDragging) {
        isDragging = false;
        menu.style.transition = "transform 0.3s ease";
        if (newY < -20) {
            newY = null
            menuList.style.transform = "translateY(-200%)"; // Hide the menu
            icon.classList.remove('open')
            menuList.classList.remove('open')
        } else {
            icon.classList.add('open')
            menuList.classList.add('open')
            menuList.style.transform = "translateY(0)"; // Show the menu
        }
    }
});