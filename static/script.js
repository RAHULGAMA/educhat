var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    // css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


const exams = document.getElementById("exams");
const colleges = document.getElementById("college");

exams.addEventListener("click", () => {
    console.log("You Clicked on exams");
    exams.classList.add("bcc");
    colleges.classList.remove("bcc");
    changeCollegeToExams(1);
})

colleges.addEventListener("click", () => {
    console.log("You clicked on colleges");
    colleges.classList.add("bcc");
    exams.classList.remove("bcc");
    changeCollegeToExams(0);
})

    function changeCollegeToExams(j) {
        const excol = document.querySelectorAll(".excol");
        const excolArray = Array.prototype.slice.call(excol);
        if(j==1) {
        const exam = [87,139,30,77,48,55,40,50,11,53,29,22,31,7,58,10,11,15,8, 42, 22]
        excolArray.forEach((element, key) => {
        element.innerHTML = `${exam[key]} EXAMS`;
        })
        }
        else{
        const college = [6707, 6304,1819,5464,4893,4350,2791,1701,1304,1240,1879,859,595,423,410,1246,4138,1209,107,958,1286]
        excolArray.forEach((element, key) => {
            element.innerHTML = `${college[key]} COLLEGES`;
        })
    }
}

const btech = document.getElementById("btech");
const myDropdown = document.getElementById("myDropdown");

const mba = document.getElementById("mba");
const MBAmyDropdown = document.getElementById("MBAmyDropdown");

btech.addEventListener("mouseover", () => {
    myDropdown.classList.remove("hide");
});
myDropdown.addEventListener("mouseleave", () => {
    myDropdown.classList.add("hide");
});

mba.addEventListener("mouseover", () => {
    MBAmyDropdown.classList.remove("hide");
});
MBAmyDropdown.addEventListener("mouseleave", () => {
    MBAmyDropdown.classList.add("hide");
});
