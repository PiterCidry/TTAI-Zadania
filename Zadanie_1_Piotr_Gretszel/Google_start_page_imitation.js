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

const Autocomplete = {
    name: "autocomplete",
    template: "#autocomplete",
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        },

        isAsync: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            isOpen: false,
            results: [],
            search: "",
            isLoading: false,
            arrowCounter: 0
        };
    },

    methods: {
        onChange() {
            this.$emit("input", this.search);

            if (this.isAsync) {
                this.isLoading = true;
            } else {
                this.filterResults();
                this.isOpen = true;
            }

            if (this.search.length < 1 || this.results.length < 1) {
                this.isOpen = false;
            }
        },

        filterResults() {
            this.results = this.items.filter(item => {
                return item.toLowerCase().startsWith(this.search.toLowerCase());
            });
        },

        setResult(result) {
            this.search = result;
            this.isOpen = false;
        },

        onArrowDown(evt) {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter++;
            }
        },

        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter--;
            }
        },

        onEnter() {
            this.search = this.results[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },

        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        }
    },

    watch: {
        items: function (val, oldValue) {
            if (val.length !== oldValue.length) {
                this.results = val;
                this.isLoading = false;
            }
        }
    },

    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },

    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    }
};

new Vue({
    el: "#app",
    name: "app",
    components: {
        autocomplete: Autocomplete
    }
});
