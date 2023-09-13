var TxtType = function (el, toRotate, period, stiffness) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.stiffness = parseInt(stiffness || 0)
  this.txt = "";
  this.tick();
  this.isDone = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  this.txt = fullTxt.substring(0, this.txt.length + 1);

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.loopNum < fullTxt.length) {
    if (!this.isDone) {
      setTimeout(function () {
        that.tick();
      }, delta - this.stiffness);
    }
  }
  this.loopNum++;
};

function animateOnEnter(element) {
  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // The element is now visible in the viewport
        let toRotate = element.getAttribute("data-type");
        let period = element.getAttribute("data-period");
        let stiffness = element.getAttribute("data-stiffness");
        
        if (toRotate) {
          new TxtType(element, JSON.parse(toRotate), period, stiffness);
        }

        // Unobserve the element since animation is applied
        observer.unobserve(element);
      }
    });
  });

  observer.observe(element);
}

window.onload = function () {
  const elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i]) {
      let isLazy = elements[i].getAttribute("data-lazy");
      
      if (isLazy === "true") {
        animateOnEnter(elements[i]);
      } else {
        let toRotate = elements[i].getAttribute("data-type");
        let period = elements[i].getAttribute("data-period");
        let delay = elements[i].getAttribute("data-delay");
        let stiffness = elements[i].getAttribute("data-stiffness");
        
        if (delay) {
          setTimeout(() => {
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period, stiffness);
            }
          }, Number(delay));
        } else {
          if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period, stiffness);
          }
        }
      }
    }
  }
};