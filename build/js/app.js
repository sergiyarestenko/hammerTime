$(document).ready( function(){
    loadNews();
});
$(window).resize(function(){
    closeMenu();
});


function counter() {
    var currentCount = -1;
    return function() {
        currentCount = currentCount+5;
        return currentCount;
    };
}

var plusFive = counter();
function loadNews() {

    getNews('count='+ plusFive());
}

function getNews(num) {
    $.ajax({
        url: '/liner.php',
        type: 'post',
        data: num,
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin':'*'
        },
        async: true,
        success: function(response){
            getData(response);
        }
        ,error: function (response) {
            console.log('error',response);
        }
    });
}

function getData(response) {//Json не смог распарсить нормально(думаю, из-за различия протоколов), поэтому - танцы с бубнами
        var mainArr = [];
        var arr = response.split("},");
    for(var i = 0; i<arr.length;i++){
        var str = arr[i];
        str = str.replace('{','');
        str = str.replace('}','');
        str = str.replace('",','"');
        str = str.replace('\n','');
        str = delComa(str);
        str = str.replace('"name":','"???"');
        str = str.replace('"descr":','"???"');
        str = str.replace('"category":','"???"');
        str = str.replace('"like":','"???"');
        str = str.replace('"comment":','"???"');
        str = str.replace('"date":','"???"');
        var newArr = str.split('"???"');

        var temp =[];

        for (var k = 0; k< newArr.length; k++){
            var a = $.trim(newArr[k]);
            if(a != ''){
                a = a.replace(/"/g,'');
                if(a[a.length - 1] == ','){
                    a = a.substring(0,a.length - 1);
                }
                temp.push(a);
            }
        }
        mainArr.push(temp);
    }
        function delComa(str) {
            for(var i = 1; i<str.length; i++){
                if(str[str.length - i] == ','){
                    str = str.substring(0,str.length - i);
                   return str;
                }
            }
        }
showData(mainArr);
}

function showData(arr) {
    var app = '';
    for(var i = 0; i < arr.length; i++){
        var inner = arr[i];
        var name = inner[0];
        var desc = inner[1];
        var category = inner[2];
        var like = inner[3];
        var comment = inner[4];
        var date = new Date(inner[5]);
        date =  date.getDate().toString() + getMounthName(date.getMonth());
        function getMounthName (num) {
            var mounth ='';
            switch (num){
                case 0:
                    mounth = ' Jan';
                    break;
                case 1:
                    mounth = ' Feb';
                    break;
                case 2:
                    mounth = ' Mar';
                    break;
                case 3:
                    mounth = ' Apr';
                    break;
                case 4:
                    mounth = ' May';
                    break;
                case 5:
                    mounth = ' Jun';
                    break;
                case 6:
                    mounth = ' Jul';
                    break;
                case 7:
                    mounth = ' Aug';
                    break;
                case 8:
                    mounth = ' Sep';
                    break;
                case 9:
                    mounth = ' Oct';
                    break;
                case 10:
                    mounth = ' Nov';
                    break;
                case 11:
                    mounth = ' Dec';
                    break;
            }
            return mounth;
        }
    if (like){
        like = '<div class="item-likes"><p>'+like+' Likes</p></div>'
    }else{
        like = '';
    }
    if ( $.trim(comment) !=''){
            comment = '<div class="item-comments"><p>'+comment+' Comments</p></div> '
    }else{
            comment = '';
    }
        app = app +
            '<div class = "item-wrapper">' +

                '<div class="item-date"><span><i>'+date+'</i></span></div>' +
                '<div class="item-inner">' +
                '<div class="item-top">' +
                    '<div class="item-cat"><p><span>cat: </span> '+category+'</p></div>'
                + like + comment +
                '</div>' +
                '<div class="item-bottom">' +
                    '<h2>'+name+'</h2>' +
                    '<p>'+desc+'</p>' +
                    '<div><a href = "#">Read More</a></div>'+
                '</div>'+

                '</div>' +
            '</div>'
    }

    $('#app').html(app);
}




$('.parent').on('click',function () {
    var ul = $(this).find('ul');
    if($(ul).hasClass('open')){
        closeSubMenu(ul);
    }else{
       openSubMenu(ul);
    }
    return false
});


function openMenu() {
    $('#close').addClass('open');
    $('#nav').addClass('open');
}

function closeMenu() {
    $('#close').removeClass('open');
    $('#nav').removeClass('open');
    $('#nav .parent').each(function () {
        closeSubMenu($(this).find('ul'));
    })

}

function openSubMenu(el) {
    $(el).addClass('open');
}

function closeSubMenu(el) {
    $(el).removeClass('open');
}
$('#close').on('click',function(){
    if($(this).hasClass('open')){
        closeMenu();

    }else{
        openMenu();
    }

});
