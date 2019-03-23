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
    computed: {
        results: function () {
            var results = [];
            var names = this.animalnames;
            var content = this.inputcontent;

            for (var i = 0; i < names.length; i++) {
                if (names[i].toLowerCase().startsWith(content.toLowerCase()) && content.length > 0) {
                    results.push(names[i]);
                }
            }

            return results;
        }
    },
    template: '<div class="autocomplete"><ul class="autocomplete-results"><li class="autocomplete-result" v-for="result in results" @click="setResult(result);">{{result}}</li></ul></div>',
    methods: {
        setResult(result) {
            document.getElementById("search").value = result;
            this.inputcontent = result;
        }
    }
});

var data = {
    inputContent: "",
    animalNames: window.animals
};

var textData = new Vue({
    el: '#main-container',
    data: data
});