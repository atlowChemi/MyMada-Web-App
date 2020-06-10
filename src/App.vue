<template>
    <div id="app" :class="'lang-' + $i18n.locale">
        <app-nav />
        <modal v-if="alert.show" :message="alert.message" :title="alert.title" :type="alert.type" :footer="alert.footerType" />
        <md-snackbar md-position="center" :md-duration="5500" :md-persistent="true" :md-active.sync="showSnackbar">
            <span>{{ alert.snackbarMessage }}</span>
        </md-snackbar>
        <main class="main-main">
            <router-view />
        </main>
        <installer-prompt v-click-outside="hideFeature" v-if="deferredPrompt" :open="deferredPrompt" @add-to-home="addToHomeScreen"></installer-prompt>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Modal from "./components/Modal.vue";
import InstallerPrompt from "./components/InstallerPrompt.vue";
import { DatabaseManager } from "./store/indexedDb";

@Component({
    name: "App",
    components: {
        Modal,
        InstallerPrompt,
    },
})
export default class App extends Vue {
    deferredPrompt: BeforeInstallPromptEvent | null = null;
    openInstaller: boolean = false;
    ogTitle: HTMLMetaElement | null = document.querySelector("meta[property='og:title']");
    ogDescription: HTMLMetaElement | null = document.querySelector("meta[property='og:description']");
    description: HTMLMetaElement | null = document.querySelector("meta[name='description']");
    mounted() {
        window.addEventListener("beforeinstallprompt", e => {
            function isBeforeInstallPromptEvent(e: Event): e is BeforeInstallPromptEvent {
                return Boolean(e) && "prompt" in e;
            }
            e.preventDefault();
            DatabaseManager.GetAskedInstall().then(res => {
                if (!res && isBeforeInstallPromptEvent(e)) {
                    this.deferredPrompt = e;
                }
            });
        });
    }
    created() {
        document.addEventListener("SW_CacheUpdated", this.swUpdateNeeded, { once: true });
        if (this.ogTitle) this.ogTitle.content = this.$t("common.app-name").toString();
    }
    get alert() {
        return this.$store.state.alert;
    }
    get showSnackbar() {
        return this.alert.showSnackbar;
    }
    set showSnackbar(val) {
        this.$store.dispatch("alert/showSnackbar", { show: false });
    }
    @Watch("$route", { immediate: true, deep: true })
    routeChange(to: any, from: any): void {
        if (from?.name === "Moked" && to.name !== "Moked") {
            this.$store.dispatch("setMedicalCodes", { medicalCodes: [] });
            this.$store.dispatch("setTeamMembers", { teamMembers: [] });
        }
        let title = `${this.$t("common.app-name")}${to.meta.title ? " - " + this.$t(to.meta.title) : ""}`;
        let description = this.$t(to.meta.description).toString() ?? this.$t("common.app-desc");
        document.title = title;
        if (this.ogTitle) this.ogTitle.content = title;
        if (this.ogDescription) this.ogDescription.content = description;
        if (this.description) this.description.content = description;
    }
    swUpdateNeeded() {
        this.$store.dispatch("alert/requestUserUpdate");
    }
    hideFeature() {
        this.deferredPrompt = null;
    }
    addToHomeScreen() {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt(); // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                DatabaseManager.SetAskedInstall(true);
            }
        });
        this.deferredPrompt = null;
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
    background: radial-gradient(ellipse at center, $radialInner 0%, $radialOuter 100%);
    #app {
        &.lang {
            &-en {
                direction: ltr;
                .md {
                    &-checkbox {
                        margin: 0.5rem 1rem 0.5rem 0;
                        &-label {
                            padding-right: 0;
                            padding-left: 1rem;
                        }
                    }
                    &-radio {
                        margin: 1rem;
                        margin-left: 0;
                        &-label {
                            padding-left: 1rem;
                            padding-right: 0;
                        }
                    }
                    &-field {
                        label {
                            right: unset;
                            left: 0;
                        }
                        &.md-required {
                            label {
                                &:after {
                                    left: unset;
                                    right: -1rem;
                                }
                            }
                        }
                        .md-error,
                        .md-helper-text {
                            right: unset;
                            left: 0;
                        }
                        &.md-clearable {
                            .md-input {
                                padding-left: 0;
                                padding-right: 30px;
                            }
                        }
                        .md-input-action {
                            left: unset;
                            right: 0;
                        }
                        & > .md-icon {
                            & ~ label {
                                left: 2.25rem;
                                right: unset;
                            }
                            & ~ .md-input,
                            & ~ .md-textarea {
                                margin-left: 0.75rem;
                                margin-right: 0;
                            }
                            &:after {
                                right: unset;
                                left: -1px;
                            }
                        }
                    }
                    &-list {
                        &-item-content {
                            & > .md-icon {
                                &:first-child {
                                    margin-left: 0;
                                    margin-right: 2rem;
                                }
                                &:last-child {
                                    margin-left: 1rem;
                                    margin-right: 0;
                                }
                            }
                        }
                    }
                }
                & ~ .md {
                    &-select-menu {
                        direction: ltr;
                    }
                    &-menu-content {
                        direction: ltr;
                        .md-highlight-text {
                            text-align: left;
                        }
                    }
                    &-snackbar {
                        direction: ltr;
                    }
                }
            }
            &-he {
                direction: rtl;
            }
        }
        .main-main {
            height: calc(100vh - 3.5rem);
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
