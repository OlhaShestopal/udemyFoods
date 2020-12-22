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

    modalTriger.forEach(e => {
      e.addEventListener('click', openModal);
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == ""){
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    });

    const modalTimeInterwal = setTimeout(openModal, 15000);

    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window,removeEventListener('scroll', showModalByScroll);
      }
    }

    window.addEventListener('scroll', showModalByScroll);



//Card by class

class MenuForms {
  constructor (src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.classes = classes;
    this.parentSelector = document.querySelector(parentSelector);

  }
  render () {
    const divMenu = document.createElement('div');

    if (this.classes.length === 0){
      this.divMenu = 'menu__item';
      divMenu.classList.add(this.divMenu);
    } else {
      this.classes.forEach(className => divMenu.classList.add(className));
    }

    
    divMenu.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
`;
    this.parentSelector.append(divMenu)
  }
}

new MenuForms (
  "img/tabs/vegy.jpg",
  "vegy",
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  229,
  '.menu .container',
).render();

new MenuForms (
  "img/tabs/elite.jpg",
  "elite",
  'Меню "Премиум"',
  'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  550,
  '.menu .container',
).render();

new MenuForms (
  "img/tabs/post.jpg",
  "post",
  'Меню "Постное"',
  'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  430,
  '.menu .container',
).render();


// POST Forms

const forms = document.querySelectorAll('form'),
      status = {
        load: "img/forms/spinner.png",
        error: "Что-то пошло не так",
        succes: "Мы скоро с Вами свяжемся",
      };

forms.forEach(item => {
  postForm(item);
});

function postForm(form) {

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('img');
    statusMessage.src = status.load;
    // statusMessage.style.display = 'block';
    // statusMessage.style.margin = '0 auto';
    
    form.insertAdjacentElement('afterend',statusMessage);
    // form.append(statusMessage);

    const formData = new FormData(form);
  
    const object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    });

    
    fetch('http://localhost:8080/send-form', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(object),
    })
    .then(res=>res.text())
    .then(data => {
        console.log(data);
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

  modal.append(thanksForm);

  setTimeout(() => {
    thanksForm.remove();
    modalDialogForm.classList.remove('hide');
    modalDialogForm.classList.add('show');
    closeModal();
  }, 4000)
  
};

fetch('http://localhost:8080/get-files')
  .then(response => response.json())
  .then(resalt => console.log(resalt));






});

