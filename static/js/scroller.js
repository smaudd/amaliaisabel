const header = document.querySelector('header')
const burger = document.querySelector('.drawer-icon')

function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
}

function navAnimation(hide) {
    if (hide) {
        burger.style.transform = 'translateY(-200%)'
    } else {
        burger.style.transform = 'translateY(0%)'
    }
}

function headerAnimation() {

    const start = 0
    let current = window.scrollY - start
    
    // if (current > window.innerHeight) {
    //     current = window.innerHeight
    // }

   

    let opacity = mapRange(current, 0, window.innerHeight, 1, 0.5)
    let alpha = mapRange(current, 0, window.innerHeight, 0, 1)
    let blur = mapRange(current, 0, window.innerHeight, 0, 60)
    let scale = mapRange(current, 0, window.innerHeight, 1, 0)

    if (opacity < 0.5) {
        opacity = 0.5
    }

    if (alpha < 0) {
        alpha =1 
    }

    if (blur > 60) {
        blur = 60
    }


    header.style.opacity = opacity
    header.style.backgroundColor = `rgba(79, 24, 110, ${alpha})`
    header.style.filter = `blur(${blur}px)`
    header.querySelector('img').style.transform = `scale(${scale})!important`

  
}

document.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        setTimeout(() => {
            headerAnimation()
            if (window.scrollY < 10) {
                navAnimation(true)
            } else {
                navAnimation(false)
            }
        }, 60)
    })

})
requestAnimationFrame(() => {
    navAnimation(true)
    headerAnimation()
})