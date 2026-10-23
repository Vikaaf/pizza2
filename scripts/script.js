new WOW({
    animateClass: 'animate__animated',
}).init();

$('.open-popup-link').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});

$('.advantage-img').magnificPopup({
    type: 'image'
    // other options
});

//$('.parallax-window').parallax({imageSrc: '../images/pizza_walp.jpg'});

$('h1').html('Самая крутая пицца ждет <span>только в нашем ресторане</span>');

$('.btn:not(#choose-pizza)').css({
    backgroundColor: 'transparent',
    border: '1px solid rgb(255, 175, 24)',
    color: 'rgb(255, 175, 24)'
})

let inputName = $('#name-input');

inputName.attr('placeholder', 'Имя');

$('.rights span').text(new Date().getFullYear());

let pizzas = $('.pizza-item');
for (let i = 0; i < pizzas.length; i++) {
    if (i % 2 === 1) {
        let element = pizzas.eq(i).children().eq(1);
        element.text(element.text() + "*");
    }

}


$('#choose-pizza').click( function () {
    $('.pizza-choose')[0].scrollIntoView({behavior: "smooth"});
});



$('.btn-click').click(function (e) {
    inputName.val($(e.target).parents('.pizza-item').find('.pizza-title').text());
    $('.order')[0].scrollIntoView({behavior: "smooth"});
})

let inputPhone = $('#phone-input');
inputPhone.inputmask({"mask": "(999) 999-99-99"});
$('#create-order').click(function () {
    let inputAddress = $('#address-input');

    if (!inputName.val()) {
        alert('Заполните пиццу');
        return;
    }
    if (!inputAddress.val()) {
        alert('Заполните адрес');
        return;
    }
    if (!inputPhone.val()) {
        alert('Заполните номер')
        return;
    }
    $.ajax({
        method: 'GET',
        url: 'https://testologia.site/test-cookie?name=' + inputName.value,
        xhrFields: {
            withCredentials: true
        }
    })

    alert('Спасибо за заказ!');
    inputName.val("");
    inputAddress.val("");
    inputPhone.val("");
});






//localeStorage, cookie
if (!localStorage.getItem('cookieAccepted')) {
    $('.cookie').show();
}

$('.cookie-accept').click(function () {
    $('.cookie').hide();
    localStorage.setItem('cookieAccepted', '1');
})



let cookie = {
    set: (name, value, options) => {
        if (!name || !value) {
            return null
        }

        let string = name + '=' + value;
        if (options) {
            string += '; ' + options;
        }

        document.cookie = string;
        return cookie
    },

    get: (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },
    delete: (name) => {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}

