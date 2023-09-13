const scripts = document.querySelectorAll('.script')
const modal = document.querySelector('.script-modal')
const modalView = document.querySelector('.script-modal .view')
const modalElements = document.querySelector('.script-modal .elements')
const modalClose = document.querySelector('.script-modal .close')

modalClose.addEventListener('click', () => {
    modal.style.display = 'none'
})

for (let script of scripts) {
    script.addEventListener('click', (e) => {
        const element = e.target
        const images = JSON.parse(element.dataset.images)
        console.log(images)
        modal.style.display = 'inherit'
        const elements = images.map(image => `<img src="${image}" />`).join('')
        modalElements.innerHTML = elements
        modalView.innerHTML = `<img src="${images[0]}" />`
        listenElements()
    })
}

function listenElements() {
    const elements = modalElements.querySelectorAll('img')
    elements.forEach((img)=> {
        img.addEventListener('click', () => {
            elements.forEach((element) => {
                element.classList.toggle('active')
            })
            modalView.innerHTML = `<img src="${img.src}" />`
        })
    })
}