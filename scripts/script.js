// document.getElementsByTagName('h1')[0].innerHTML='Самая крутая пицца ждет <span>только в нашем ресторане</span>';

// document.getElementById('products-title').style.color = '#000000';

// let buttonElms = document.querySelectorAll('.btn');
// buttonElms.forEach((item) => {
//     if(item.innerText === 'Оформить заказ'){
//         return;
//     }
//     item.style.backgroundColor = 'transparent'
//     item.style.border = '1px solid rgb(255, 175, 24)'
//     item.style.color = 'rgb(255, 175, 24)'
// })


// for(let i = 0; i<buttonElms.length; i++){
//     if(buttonElms[i].innerText === 'Оформить заказ'){
//         continue;
//     }
//     buttonElms[i].style.backgroundColor = 'transparent'
//     buttonElms[i].style.border = '1px solid rgb(255, 175, 24)'
//     buttonElms[i].style.color = 'rgb(255, 175, 24)'
// }

// document.getElementById('name-input').placeholder = 'Имя'

// document.querySelector('.rights span ').innerText = (new Date().getFullYear())

// let products = document.getElementsByClassName('product');
// for(let i = 0; i<products.length; i++){
//     if(i%2===1){
//         products[i].children[1].innerText += '*';
//     }
// }

// document.getElementById('choose-pizza').onclick=function(){
//     document.getElementsByClassName('products')[0].scrollIntoView({behavior: "smooth"});
// }
// let productInput = document.getElementById('product-input')
// let addToCardButtons = document.getElementsByClassName('btn-add-to-cart');
// for(let i =0; i<addToCardButtons.length;i++){
//     addToCardButtons[i].onclick = function(event){
//         productInput.value = event.target.parentElement.previousElementSibling.previousElementSibling.innerText
//         document.getElementsByClassName('order')[0].scrollIntoView({behavior: "smooth"});
//     }
// }


// document.getElementById('create-order').onclick = function  () {
//     let addresstInput = document.getElementById('address-input');
//     let phoneInput = document.getElementById('phone-input');
//     if(!productInput.value){
//         alert('Заполните пиццу');
//         return;
//     }
//     if(!addresstInput.value){
//         alert('Заполните адрес');
//         return;
//     }
//     if(!phoneInput.value){
//         alert('Заполните телефон');
//         return;
//     }
//     alert('Спасибо за заказ');
//     productInput.value = '';
//     addresstInput.value = '';
//     phoneInput.value = ''

// }


//-------не на JQ--------------------------------------------------------------------



//------JQ--------------------------------------------------------------------
$('h1').html('Самая крутая пицца ждет <span>только в нашем ресторане</span>')

$('#products-title').css('color', '#000000')

$('.btn:not(#no-touch)').css({
    backgroundColor: 'transparent',
    border: '1px solid rgb(255, 175, 24)',
    color: 'rgb(255, 175, 24)',
})

$('#name-input').attr("placeholder",'Имя')

$('.rights span').text((new Date().getFullYear()))

let products = $('.product');
for(let i = 0; i<products.length; i++){
    let productTitle = products.eq(i).find('.product-title')                     //Пример регулярного выражения изменения слова Куриная на Индейка
    productTitle.text( productTitle.text().replace(/(Кури[а-я]+)(.+)/gi, '$2 из индейки'))  //(.+)-это сохранениеследующих слов после слова Куриная, а что бы использовать эти слова во втором выражении прописывается $2
    if(i%2===1){
        // products[i].children[1].innerText += '*';
let elm = products.eq(i).children().eq(1)
elm.text(elm.text()+"*")
    }
}


$('choose-pizza').click(function(){
    $('products')[0].scrollIntoView({behavior: "smooth"});
})


let productInput = $('#product-input')
$('.btn-add-to-cart').click((e)=>{
    productInput.val($(e.target).parents('.product').find('.products-title').text())
    $('.order')[0].scrollIntoView({behavior: "smooth"});
})



// $('#create-order').click(function  () {
//     let addresstInput = $('#address-input');
//     let phoneInput = $('#phone-input');
//     if(!productInput.val()){
//         alert('Заполните пиццу');
//         return;
//     }
//     if(!addresstInput.val()){
//         alert('Заполните адрес');
//         return;
//     }
//     if(!phoneInput.val()){
//         alert('Заполните телефон');
//         return;
//     }
//     alert('Спасибо за заказ');
//     productInput.value = '';
//     addresstInput.value = '';
//     phoneInput.value = ''

// })

// if(!localStorage.getItem('cooceAccepted')){ //если нет ключа (cooceAccepted) значит показываем окно
//     $('.cookie').show();
// }

// $('.cookie-accept').click(function(){
//     $('.cookie').hide()
//     localStorage.setItem('cooceAccepted','1')
// })


// let cookie ={
//     set: (name, value ,options)=>{
//         if(!name || !value){
//             return null
//         }
//         let string = name + '=' + value;
//         if(options){
//             string += ';' + options
//         }
//         document.cookie = string
//     },
//     get: (name)=>{
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; ${name}=`);
//         if (parts.length === 2) return parts.pop().split(';').shift();
//     },
//     delete: (name)=>{
//         document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:001 GMT'
//     }
// }


$('#create-order').click(function(){
    let hasError =false;
    let adressInput = $('#address-input');
    let phoneInput=$('#phone-input')

    $('.order-input').css('border_color', 'red')

    if(!productInput.val().match(/^[А-Я][а-я]+\s*$/)){
        productInput.css('border-color', 'red')
        hasError = true;
    }
    if(!adressInput.val().match(/^[a-яА-Я0-9,\.\s]+$/)){
        adressInput.css('border-color', 'red')
        hasError = true;
    }
    // if(!phoneInput.val().match(/^\+7\s\(9\d{2}\)\s\d{3}-\d{2}-\d{2}/)){
    //     phoneInput.css('border-color', 'red')
    //     hasError = true;
    // } // мы добавили изменения в html в виде pattern и обязательно прописали requer а так же обязательно изменили div на form так как если не являлось бы формой оно б не работало
    if(!hasError){
        
        $.ajax({
            method: 'POST',
            url: 'http://testologia.site/checkout',
            data:{
                product: productInput.val(),
                name: adressInput.val(),
                phone: phoneInput.val(),
            }
        })
        .done(function(msg){
           
            if(msg.succes){
                alert('Спасибо за зак')
            }else{
                alert('Что то')
            }
        })
    }
})