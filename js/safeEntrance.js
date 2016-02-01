//We want to verify this before loading any templates and scripts!
var userToken = $.cookie('userToken');
if(userToken){
    $.ajax({
        url: 'http://umovie.herokuapp.com/tokenInfo',
        type: 'GET',
        beforeSend: function (request){
            request.setRequestHeader('Authorization', userToken);
        }
    }).done(function (data){
        console.log('Welcome to UMovie!');
    }).fail(function (){
        window.location.href = "./home.html";
    });
}else{
    window.location.href = "./home.html";
}