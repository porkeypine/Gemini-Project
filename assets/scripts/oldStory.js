$(document).ready(function(){
    $("body").fadeIn(2000);

    $("#text1").delay(1000).fadeIn(1000);
    
    $('#ct1').click(function(){
        $("#text1").fadeOut(500, function(){
            $("#text2").fadeIn(500);
            $(".door").fadeIn(0, function() {
                $(".door").css("cursor", "pointer");
            });
        });
    });
    
    $(".door").click(function() {
        $("#text2").fadeOut(500);
        $("#text3").delay(500).fadeIn(500);
    });

    // $("#ct2").click(function() {
    //     $(".background").hide(0);
    //     $(".doorAjarBg").show(0);
    //     $("#text3").hide(0);
    // })

    $("#door1").click(function() {
        $(".background").hide(0);
        $(".doorAjarBg").show(0);
        $("#text2").hide(0);
        $("#text4").delay(1000).fadeIn(500);
    })

    $(".doorAjar").click(function() {
        $(".background").show(0);
        $(".doorAjarBg").hide(0);
        $(".door").hide(0);
        $(".key").show(0);
        $("#text4").delay(1000).fadeIn(500);
    })
    
    $("#ct3").click(function() {
        $("#text4").fadeOut(500, function() {
            $("#text5").fadeIn(200);
            $("#text5").fadeOut(8000);
        })
    })
    
    $("#key 1").click(function() {
        $(".key").hide(0);
        $("#text6").fadeIn(200);
    })


});
