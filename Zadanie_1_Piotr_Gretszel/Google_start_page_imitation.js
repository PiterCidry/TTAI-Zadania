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

Vue.component('div-autocompleter', {
    props: ['inputcontent', 'animalnames'],
    data: function () {
        var xd = {msg: "Hej!", type: "Powitanie"}
        if (this.inputcontent) {
            xd.msg = "Hejcia!";
        } else {
            xd.msg = "Spadaj!";
        }
        return(xd);
    },
    computed: {
        results: function () {
            let res = [];

            for (let i = 0; i < this.inputcontent.length; i++) {
                res.push(this.inputcontent);
            }

            return res;
        }
    },
    template: '<p>{{type}}: {{msg}} {{inputcontent}} <span v-for="result in results">{{result}}</span></p>'
});

var data = {
    inputContent: "",
    animalNames: window.animals
};

var textData = new Vue({
    el: '#main-container',
    data: data
});