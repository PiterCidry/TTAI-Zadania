window.onload = function() {
    const inputSearch = document.getElementById("search");
    const linkToBeDeveloped = document.getElementsByClassName("linkToBeDeveloped");

    if (linkToBeDeveloped && linkToBeDeveloped.length > 0) {
        for (let i = 0; i < linkToBeDeveloped.length; i++) {
            linkToBeDeveloped[i].addEventListener("click",
                function() {
                    alert("Functionality to be developed later.");
                });
        }
    }

    window.$("#search").focus(function() {
        window.$("#input-text").addClass("border-outline");
    });

    window.$("#search").focusout(function() {
        if (!window.$("#input-text").is(":hover")) {
            window.$("#input-text").removeClass("border-outline");
        }
    });

    window.$("#input-text").hover(function() {
        window.$(this).addClass("border-outline");
    });

    window.$("#input-text").mouseleave(function() {
        if (!window.$("#search").is(":focus")) {
            window.$(this).removeClass("border-outline");
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

let vue = new Vue({
    el: "#app",
    name: "app",
    components: {
        autocomplete: Autocomplete
    }
});