let images = [{
    url: "https://i.postimg.cc/rsL1g6ct/image1.png",
    title: "Ростов Адмирал"
  }, {
    url: "https://i.postimg.cc/T1qr4kYN/image2.png",
    title: "Сочи"
  }, {
    url: "https://i.postimg.cc/y6FXxNXh/image3.png",
    title: "Ростов Патриотик"
  }
];

function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        titles: false,
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector(".images");
    let sliderArrows = document.querySelectorAll(".arrow");
    let sliderDots = document.querySelector(".slider__dots");
    let sliderHederMenu = document.querySelectorAll(".header-menu")

    initImages();
    initArrows();
    initDots();
    initHeaderMenu();

    function initImages() {
        images.forEach((image, index) => {
          let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
          sliderImages.innerHTML += imageDiv;
        });
    }

    function initArrows() {
        sliderArrows.forEach(arrow => {
          arrow.addEventListener("click", function() {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber;
            if (arrow.classList.contains("slider__arrow-left")) {
              nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
            } else {
              nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
            }
            moveSlider(nextNumber);
          });
        });
    }

    function initDots() {
      images.forEach((image, index) => {
        let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
      });
      sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
        dot.addEventListener("click", function() {
          moveSlider(this.dataset.index);
          sliderDots.querySelector(".active").classList.remove("active");
          this.classList.add("active");
        })
      })
    }

    function initHeaderMenu() {
      images.forEach((image, index) => {
        let nextSlide = +sliderImages.querySelector(".active").dataset.index;
        sliderHederMenu.querySelector(".header-menu").forEach(nextSlide => {
          nextSlide.addEventListener("click", function() {
            moveSlider(this.dataset.index);
            sliderHederMenu.querySelector(".active").classList.remove("active");
            this.classList.add("active");
          })
        })
      })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", initSlider);