(function ($) {
    var searchedItem = "";

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
                searchedItem = this.search;
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
                searchedItem = this.search;
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

    function addOrUpdateUrlParam(href, name, value) {
        var regex = new RegExp(`[&\\?]${name}=`);
        if (regex.test(href)) {
            regex = new RegExp(`([&\\?])${name}=\\d+`);
            window.location.href = href.replace(regex, `$1${name}=${value}`);
        }
        else {
            if (href.indexOf("?") > -1)
                window.location.href = href + "&" + name + "=" + value;
            else
                window.location.href = href + "?" + name + "=" + value;
        }
    }

    window.onload = function () {
        const inputSearch = document.getElementById("search");
        const linkToBeDeveloped = document.getElementsByClassName("linkToBeDeveloped");
        const luckyButton = document.getElementById("lucky-luke");
        const toolsButton = document.getElementById("toolsButton");
        const searchButton = document.getElementsByClassName("searchButton");

        if (luckyButton) {
            luckyButton.addEventListener("click",
                function () {
                    window.location.href = "https://www.google.com/doodles/";
                });
        }

        if (toolsButton) {
            toolsButton.addEventListener("mouseenter",
                function () {
                    toolsButton.classList.add("imitate-button");
                });

            toolsButton.addEventListener("mouseleave",
                function () {
                    toolsButton.classList.remove("imitate-button");
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

        if (searchButton && searchButton.length > 0) {
            for (let i = 0; i < searchButton.length; i++) {
                searchButton[i].addEventListener("click",
                    function () {
                        addOrUpdateUrlParam("google_results_page.html", "val", searchedItem);
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

}(jQuery));