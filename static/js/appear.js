const elements = document.querySelectorAll('.fade-in-top');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-top');
            }, entry.target.dataset.delay || 0)
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

elements.forEach(element => {
    observer.observe(element);
});
