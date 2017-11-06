$(document).ready( function(){
    loadNews()
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
        url: '/build/liner.php',
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
        var date = inner[5];
        date = date.substring(0,date.length - 5);



        app = app +
            '<div class = "item-wrapper">' +
                '<div class="item-inner">' +
                '<div class="item-date"><i>'+date+'</i></div>' +
                '<div class="item-top">' +
                    '<div class="item-cat"><p> cat: '+category+'</p></div> '+
                    '<div class="item-likes"><p>'+like+' Likes</p></div> '+
                    '<div class="item-comments"><p>'+comment+' Comments</p></div> '+
                '</div>' +
                '<div class="item-bottom"><h2>'+name+'</h2><p>'+desc+'</p></div>'+
                '<div class="item-link"><a href = "#">Read More</a></div>'+
                '</div>' +
            '</div>'
    }
    console.log(app);
    $('#app').html(app);
}