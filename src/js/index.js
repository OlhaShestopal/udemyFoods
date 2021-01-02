window.addEventListener('DOMContentLoaded', () =>{

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
      
      
    function hideTabContent () {
      tabsContent.forEach(item => {
        item.style.display = 'none';
      });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    })
    }

    function showTabContent(i = 0){
      tabsContent[i].style.display = 'block';
      tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')){
        tabs.forEach((item, i) => {
          if (target == item){
            hideTabContent();
            showTabContent(i);
            
          }
        });
      }
    });

    //Timer

    const deadline = '2020-12-31';

    function getTimeRemaning(endtime){
      const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    return{
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
    };

    function getZero(num){
      if (num >= 0 && num < 10){
        return `0${num}`;
      }else{
        return num;
      }
    };

    function setClock(selectos, endtime) {
      const timer = document.querySelector(selectos),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

      updateClock();
      function updateClock(){
        const t = getTimeRemaning(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0){
          clearInterval(timeInterval);
        }
      }
      };

    setClock('.timer', deadline);

    //Modal

    const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        
    modalTriger.forEach(e => {
          e.addEventListener('click', openModal);
        });

    function closeModal(){
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    function openModal(){
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearTimeout(modalTimeInterwal);
    };

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == ""){
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    const modalTimeInterwal = setTimeout(openModal, 150000);

    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window,removeEventListener('scroll', showModalByScroll);
      }
    }

    window.addEventListener('scroll', showModalByScroll);



//Card 


    const getResource = async (url) => {
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      const data = await res.json();
      return data;
  
    };
    class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.classes = classes;
          this.parent = document.querySelector(parentSelector);
          this.transfer = 27;
          this.changeToUAH(); 
      }

      changeToUAH() {
          this.price = this.price * this.transfer; 
      }

      render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }
}


    
    getResource('http://localhost:8080/get-files')
    .then(data =>  {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      })
      
    }
      );


// POST Forms

const forms = document.querySelectorAll('form'),
      status = {
        load: "img/forms/spinner.png",
        error: "Что-то пошло не так",
        succes: "Мы скоро с Вами свяжемся",
      };

forms.forEach(item => {
  bindPostData(item);
});


async function postData(url, data){
  let res = await fetch(url,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    const dataInfo = await res.json();
      return dataInfo;
      
    };

    function bindPostData(form) {

      form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        let statusMessage = document.createElement('img');
        statusMessage.src = status.load;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
    `;
        
        form.insertAdjacentElement('afterend',statusMessage);
        // form.append(statusMessage);
    
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
        postData('http://localhost:8080/send-form', json)
        .then(dataInfo => {
            console.log(dataInfo);
            showShankDialog(status.succes);
            statusMessage.remove();
        }).catch(() => {
            showShankDialog(status.error);
            statusMessage.remove();
        }).finally(() =>{
          form.reset();
        })
      });
    };
    

// Form message

function showShankDialog(massage) {
  const modalDialogForm = document.querySelector('.modal__dialog');
  modalDialogForm.classList.add('hide');

  openModal();

  const thanksForm = document.createElement('div');
  thanksForm.classList.add('modal__dialog');
  thanksForm.innerHTML = `
  <div class = "modal__content">
    <div class = "modal__close" data-close>×</div>
    <div class = "modal__title">  ${massage}</div>
  </div>
  `;

  document.querySelector('.modal').append(thanksForm);

  setTimeout(() => {
    thanksForm.remove();
    modalDialogForm.classList.add('show');
    modalDialogForm.classList.remove('hide');
    closeModal();
  }, 4000)
  
};

// fetch('http://localhost:8080/get-files')
//   .then(response => response.json())
//   .then(resalt => console.log(resalt));


// Slider


const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      width = window.getComputedStyle(slidesWrapper).width,
      slidesField = document.querySelector('.offer__slider-inner');


let slideIndex = 1;

slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
      dots = [];
indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
slider.append(indicators)

let offset = 0;

for (let i = 0; i < slides.length; i++){
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1);
  dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
      `;
    if(i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);

}
    
  if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }

next.addEventListener('click', () => {
  if (offset == (+width.slice(0, width.length - 2) * (slides.length -1))){
    offset = 0;
  }else {
    offset += +width.slice(0, width.length - 2);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == slides.length) {
        slideIndex = 1;
      } else{
        slideIndex++;
      }
  
  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }
dots.forEach(dot => dot.style.opacity = '.5');
dots[slideIndex - 1].style.opacity = '1'
})

prev.addEventListener('click', () => {
  if (offset == 0){
    offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    
  }else {
    offset -= +width.slice(0, width.length - 2);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == 1) {
    slideIndex = slides.length;
  } else{
    slideIndex--;
  }

  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = '1';
});

dots.forEach(dot => {
  dot.addEventListener('click', (e) =>{
    const slideTo = e.target.getAttribute('data-slide-to');

    slideIndex = slideTo;
    offset = +width.slice(0, width.length - 2) * (slideTo - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  })
})






// function showSlides (n) {

//     if (n > slides.length) {
//         slideIndex = 1;
//       } 
//     if (n < 1){
//       slideIndex = slides.length;
//     }
//     slides.forEach((item) => item.classList.add ('hide'));
//     slides[slideIndex - 1].classList.remove('hide');
//     slides[slideIndex - 1].classList.add ('show');
    

//     if (slides.length < 10) {
//       current.textContent =  `0${slideIndex}`;
//   } else {
//       current.textContent =  slideIndex;
//   }
// }

// function plussSlides(n) {
//   showSlides(slideIndex +=n);

// }

// showSlides(slideIndex);

// if (slides.length < 10) {
//   total.textContent = `0${slides.length}`;
// } else {
//   total.textContent = slides.length;
// }


// prev.addEventListener('click', () =>{
//   plussSlides(-1);
// });

// next.addEventListener('click', () =>{
//   plussSlides(1);
// });






});
