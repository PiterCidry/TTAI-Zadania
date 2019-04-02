window.onload = function () {
    const luckyButton = document.getElementById("lucky-luke");

    if (luckyButton) {
        luckyButton.addEventListener("click", function () {
            window.location.href = "https://www.google.com/doodles/";
        });
    }
};