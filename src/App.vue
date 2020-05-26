<template>
    <div id="app">
        <app-nav />
        <modal v-if="alert.show" :message="alert.message" :title="alert.title" :type="alert.type" :footer="alert.footerType" />
        <main class="main-main">
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Modal from "./components/Modal.vue";

@Component({
    name: "App",
    components: {
        Modal,
    },
})
export default class App extends Vue {
    get alert() {
        return this.$store.state.alert;
    }
    @Watch("$route", { immediate: true, deep: true })
    routeChange(to: any, from: any): void {
        if (from?.name === "Moked" && to.name !== "Moked") {
            this.$store.dispatch("setMedicalCodes", { medicalCodes: [] });
            this.$store.dispatch("setTeamMembers", { teamMembers: [] });
        }
        document.title = `דיווחי מד"א${to.meta.title ? " - " + to.meta.title : ""}`;
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    &::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 8px;
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
        background: white;
    }
    &::-webkit-scrollbar-thumb {
        background: $btnDisabledColor;
        border-radius: 8px;
    }
}

html {
    position: relative;
    min-height: 100%;
}
body {
    margin: 0;
    padding: 0;
    font-family: "Heebo", serif;
    @include vendor(user-select, none);
    background-color: $background;

    .main-main {
        height: calc(100vh - 3.5rem);
        //padding: 1rem;
        margin: 0 auto;
        overflow-y: auto;

        .container {
            width: 90%;
            max-width: 45rem;
            margin: 0 auto;
            overflow-wrap: break-word;
            padding-bottom: 2rem;
        }

        .centered {
            text-align: center;
        }

        .grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: stretch;
        }

        .card {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
            border-radius: 0.7rem;
            padding: 1rem 0;

            &__header,
            &__content {
                padding: 1rem;

                h1,
                h2,
                p {
                    margin: 0;
                }
            }

            &__image {
                text-align: center;
                width: 100%;
                height: 10rem;

                img {
                    max-width: 100%;
                    max-height: 10rem;
                }
            }

            &__actions {
                padding: 1rem;
                text-align: center;

                form {
                    display: inline;
                }

                button,
                a {
                    text-decoration: none;
                    margin: 0 0.25rem;
                }
            }
        }

        .image {
            max-height: 20rem;

            @include desktop {
                height: 20rem;
            }

            img {
                max-height: 100%;
                max-width: 100%;
            }
        }

        .code {
            display: inline-block;
            background-color: #eee;
            border-radius: 5px;
            font-family: courier, monospace;
            padding: 0.7rem;
            margin: 0.4rem;
            text-align: left;
            white-space: pre;
            direction: ltr;
        }
    }
}
</style>

<style lang="scss">
@font-face {
    font-family: "atlowApps";
    src: url("assets/fonts/atlowApps.eot?9xqudu");
    src: url("assets/fonts/atlowApps.eot?9xqudu#iefix") format("embedded-opentype"), url("assets/fonts/atlowApps.ttf?9xqudu") format("truetype"), url("assets/fonts/atlowApps.woff?9xqudu") format("woff"), url("assets/fonts/atlowApps.svg?9xqudu#atlowApps") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: block;
}
[class^="icon-"],
[class*=" icon-"] {
    font-family: "atlowApps" !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.icon {
    &-als:before {
        content: "\e900";
    }
    &-apgar:before {
        content: "\e901";
    }
    &-bls:before {
        content: "\e902";
    }
    &-contractions:before {
        content: "\e903";
    }
    &-dead:before {
        content: "\e904";
    }
    &-dictionary:before {
        content: "\e905";
    }
    &-glazgow:before {
        content: "\e906";
    }
    &-metronome:before {
        content: "\e907";
    }
    &-oxygen:before {
        content: "\e908";
    }
    &-pulse:before {
        content: "\e909";
    }
    &-vital:before {
        content: "\e90a";
    }
    &-whatsapp {
        font-size: 5rem;
        margin: 0;
        &:before {
            content: "\e90b";
        }
    }
}
</style>
