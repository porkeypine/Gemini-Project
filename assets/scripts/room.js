$(document).ready(function(){
    $("#text1").fadeIn(1000);
    
    $('.clickText').click(function(){
        $("#text1").fadeOut(1000, function(){
            $("#text2").fadeIn(500);
        });
    });
});
