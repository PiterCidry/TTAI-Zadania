window.onload = function () {
    var luckyButton = document.getElementById("lucky-luke");
    var linkToBeDeveloped = document.getElementsByClassName("linkToBeDeveloped");
    var inputSearch = document.getElementById("search");

    if (luckyButton) {
        luckyButton.addEventListener("click", function () {
            window.location.href = "https://www.google.com/doodles/";
        });
    }

    if (linkToBeDeveloped && linkToBeDeveloped.length > 0) {
        for (var i = 0; i < linkToBeDeveloped.length; i++) {
            linkToBeDeveloped[i].addEventListener("click", function () {
                alert('Functionality to be developed later.');
            });
        }
    }

    $("#search").focus(function () {
        $("#input-text").addClass("border-outline");
    });

    $("#search").focusout(function () {
        if (!$("#input-text").is(":hover")) {
            $("#input-text").removeClass("border-outline");
        }
    });

    $("#input-text").hover(function () {
        $(this).addClass("border-outline");
    });

    $("#input-text").mouseleave(function () {
        if (!$("#search").is(":focus")) {
            $(this).removeClass("border-outline");
        }
    });

    if (inputSearch) {
        inputSearch.focus();
    }
};