window.onload = function () {
    var luckyButton = document.getElementById("lucky-luke");
    var linkToBeDeveloped = document.getElementsByClassName("linkToBeDeveloped");

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
};