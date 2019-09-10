$(function() {
    'use strict';

    function translit(arg){
        // Символ, на который будут заменяться все спецсимволы
        let space = '-';
        // Берем значение из нужного поля и переводим в нижний регистр
        let text = $(arg).val();
        //let text = document.getElementById('name').value.toLowerCase();
        // Массив для транслитерации
        let transl = {
                        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'io', 'ж': 'zh', 'з': 'z', 'и': 'i',
                        'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
                        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': space, 'ы': 'y',
                        'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',

                        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Jo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
                        'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
                        'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
                        'Э': 'E', 'Ю': 'Ju', 'Я': 'Ja', ' ': '_', 'І': 'I', 'Ї': 'I', 'Є': 'E',

                        ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space, '#': space, '$': space,
                        '%': space, '^': space, '&': space, '*': space, '(': space, ')': space, '-': space, '\=': space,
                        '+': space, '[': space, ']': space, '\\': space, '|': space, '/': space, '.': space, ',': space,
                        '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space, '?': space, '<': space,
                        '>': space, '№': space
                     }

        let result = '';

        let curent_sim = '';

        for(let i=0; i < text.length; i++) {
            // Если символ найден в массиве то меняем его
            if(transl[text[i]] !== undefined) {
                if(curent_sim != transl[text[i]] || curent_sim != space){
                    result += transl[text[i]];
                    curent_sim = transl[text[i]];
                }
            }
            // Если нет, то оставляем так как есть
            else {
                result += text[i];
                curent_sim = text[i];
            }
        }

        result = TrimStr(result);

        // Выводим результат


        $('.Active').val(result);
        //document.getElementById('EnglishLastName').value = result;

    }
    function TrimStr(s) {
        s = s.replace(/^-/, '');
        return s.replace(/-$/, '');
    }

    // Выполняем транслитерацию при вводе текста в поле
    $(function(){
        $('#LastName').keyup(function(){
            translit(this);
            return false;
        });
    });

    // Выполняем транслитерацию при вводе текста в поле
    $(function(){
        $('#FirstName').keyup(function(){
            translit(this);
            return false;
        });
    });










// Render Data of Select Group - Date of Birth

let day = new Date(),

md = (new Date(day.getFullYear(), day.getMonth() + 1, 0, 0, 0, 0, 0)).getDate(),

$month_name = "января февраля марта апреля мая июня июля августа сентября октября ноября декабря".split(" ");



function set_select(a, c, d, e) {

let el = document.getElementsByName(a)[0];

for (let b = el.options.length = 0; b < c; b++) {

    el.options[b] = new Option(a == 'month' ? $month_name[b] : b + d, b + d);

 }

el.options[e] && (el.options[e].selected = !0)

}

set_select("day", md, 1, 0);

set_select("month", 12, 1, day.getMonth());

set_select("year", 101, day.getFullYear()-100, 20);







let year = document.getElementById('year');

let month = document.getElementById("month");



function check_date() {

let a = year.value | 0,

    c = month.value | 0;

md = (new Date(a, c, 0, 0, 0, 0, 0)).getDate();

a = document.getElementById("day").selectedIndex;

set_select("day", md, 1, a);
CheckYear ();
}



if (document.addEventListener) {

year.addEventListener('change', check_date, false);

month.addEventListener('change', check_date, false);



} else {

year.detachEvent('onchange', check_date);

month.detachEvent('onchange', check_date);

}



  //$('select').on('change', function(){

 // });

    function get_current_age(date) {

  return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;

}



// $('#day').blur( function () {

 function CheckYear () {
  if ($('#day').val() < 10) {
    var DayBirth = '0'+$('#day').val();
 }
    DayBirth = $('#day').val();


 // $('#month').blur( function () {


  if ($('#month').val() < 10) {
    var MonthBirth = '0'+$('#month').val();
 }
    MonthBirth = $('#month').val();

//function DisplayError () {
  let DateBirth = $('#year').val() +'-'+ MonthBirth +'-'+DayBirth;

let Age = get_current_age(DateBirth);

if (Age>90) {

    $('.displayError').html('К сожалению, климат Марса неблагоприятен для людей старше 90 лет');
    $('.displayError').css("background", "#feffdd");
    $('.displayError').addClass("drop-shadow");
    $('.chColor').css("background", "#feffdd");
//alert (Age)}
}
if (Age<=90) {
  $('.displayError').html('');
  $('.chColor').css("background", "transparent");
  $('.displayError').css("background", "transparent");
    $('.displayError').removeClass("drop-shadow");
  $('.chColor').css("background", "transparent");

//alert (Age)}
}
}

//Click on button Sex


$('.button').on('click', function () {
    $('.js-selected').removeClass('js-selected');
    $(this).toggleClass('js-selected');
    if ($('#Male').hasClass('js-selected')) {
      $('#Sex').val("Мужской")
    }
    if ($('#Female').hasClass('js-selected')) {
      $('#Sex').val("Женский")
    }
 });

function NotRequired () {
$('#sex').prop("required", "false");
}


// Selected empty field by defolt
$(function () {
	$("select").val("").trigger("chosen:updated");
})


//Family Select
$('.family').append('<option value="женат">женат</option>');
$('.family').append('<option value="в гражданском браке"">в "гражданском браке"</option>');
$('.family').append('<option value="разведён">разведён</option>');
$('.family').append('<option value="холост">холост</option>');
$('.family').append('<option value="вдовец">вдовец</option>');




//Family Select
$('.education').append('<option value="высшее">высшее</option>');
$('.education').append('<option value="средне-специальное">средне-специальное</option>');
$('.education').append('<option value="среднее">среднее</option>');
$('.education').append('<option value="студент">студент</option>');

//Mask for the phone
$(function(){

  $("#tel").mask("+7 (999) 999-9999");
});


})

//Submission


function formError(){
    $("#form-submit").addClass('bounce animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass('bounce animated');
         $("#resultMsg").html('Не все поля заполнены!');
    });
}

// Bind to the submit event of our form
$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        formError();

    } else {
        event.preventDefault();
  var request;

    // Prevent default posting of form - put here to work in case of errors
    //event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbyY1XIb8jUcxvH4D8CDY4ydtc8hVAat9Y9EowQ8jvsed7UhhVM/exec",
            type: "post",
            data: serializedData
        });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Response is ok");
       $("#resultMsg").html('Ваша заявка получена!<br> <br><br><br>Результат <a target="_blank" href="https://docs.google.com/spreadsheets/d/1rR8qkYL57eQC9eQ9dC8pEVfbY11q9DZ04gNt1wzrAss/edit?usp=sharing">здесь</a>');
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
        $("#resultMsg").html('В ходе отправки произошла ошибка');
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });


};

});
