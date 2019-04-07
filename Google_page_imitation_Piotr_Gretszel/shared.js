(function ($) {
    window.onload = function () {
        const inputSearch = document.getElementById("search");
        const linkToBeDeveloped = document.getElementsByClassName("linkToBeDeveloped");
        const luckyButton = document.getElementById("lucky-luke");

        if (luckyButton) {
            luckyButton.addEventListener("click",
                function () {
                    window.location.href = "https://www.google.com/doodles/";
                });
        }

        if (linkToBeDeveloped && linkToBeDeveloped.length > 0) {
            for (let i = 0; i < linkToBeDeveloped.length; i++) {
                linkToBeDeveloped[i].addEventListener("click",
                    function () {
                        alert("Functionality to be developed later.");
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

        window.goToMainPage = function () {
            window.location.href = "Google_start_page_imitation.html";
        };
    };

    const autocomplete = {
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

            onArrowDown() {
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

    const vue = new window.Vue({
        el: "#app",
        name: "app",
        components: {
            autocomplete: autocomplete
        }
    });
}(jQuery));