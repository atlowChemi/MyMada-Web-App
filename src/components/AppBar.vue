<template>
    <header class="main-header">
        <nav class="main-header__nav" @click.capture="closeMenu">
            <div class="main-header__nav-wrapper">
                <a class="main-header__nav-wrapper__button main-header__nav-wrapper__button-right" @click="toggleMenu" v-if="isMobile && currentLoc === 'Tools'">
                    <i class="material-icons">menu</i>
                </a>
                <a class="main-header__nav-wrapper__button main-header__nav-wrapper__button-right" v-else-if="currentLoc !== 'home'" @click="goBack">
                    <i class="material-icons">arrow_forward</i>
                </a>
                <span class="main-header__nav-wrapper__brand" v-if="title">{{ title }}</span>
                <span class="main-header__nav-wrapper__brand" v-else>דיווחי מד"א</span>
                <a class="main-header__nav-wrapper__button main main-header__nav-wrapper__button-left" @click="openSettings">
                    <i class="material-icons">settings</i>
                </a>
            </div>
            <div class="main-header__nav--circle" v-if="currentLoc === 'home'"></div>
        </nav>
        <tools-menu v-if="currentLoc === 'Tools'" :menuState="menuIsOpen"></tools-menu>
        <div class="backdrop" @click="closeMenu" v-if="menuIsOpen && isMobile && currentLoc === 'Tools'"></div>
    </header>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { convertRemToPixels } from "@/utils/helperMethods";
import ToolsMenu from "./ToolsMenu.vue";

@Component({
    components: {
        ToolsMenu,
    },
})
export default class AppBar extends Vue {
    isMobile: boolean = true;
    menuIsOpen: boolean = false;
    @Watch("$route", {immediate: true, deep: true})
    changedRoute(to: any):void {
        if(to.name !== 'Tools') {
            this.menuIsOpen = false;
        }
    }
    get currentLoc(): string | undefined | null {
        return this.$route.name;
    }
    get title(): string {
        return this.$route.meta.title;
    }
    openSettings() {
        this.$store.dispatch("alert/settings");
    }
    toggleMenu() {
        this.menuIsOpen = !this.menuIsOpen;
    }
    closeMenu() {
        if(this.menuIsOpen) {
            this.menuIsOpen = false;
        }
    }
    goBack() {
        if (this.$route.name === "Moked" || this.$route.name === "Tools") {
            this.$router.replace("/");
        } else {
            this.$router.go(-1);
        }
    }

    created() {
        window.addEventListener("resize", this.sizeChanged);
        this.sizeChanged();
    }
    destroyed() {
        window.removeEventListener("resize", this.sizeChanged);
    }
    sizeChanged(): void {
        let width = window.innerWidth;
        this.isMobile = width < convertRemToPixels(48);
    }
}
</script>

<style lang="scss" scoped>
.main-header {
    $mainHeader: &;
    width: 100%;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    &__nav {
        text-align: center;
        height: 3.5rem;
        width: 100%;
        background-color: $primaryColor;
        &-wrapper {
            position: relative;
            height: 99%;
            font-size: 2.1rem;
            .material-icons {
                font-size: 1.8rem;
                vertical-align: middle;
                color: white;
            }
            &__button {
                position: absolute;
                font: inherit;
                vertical-align: middle;
                cursor: pointer;
                line-height: 3.5rem;
                &-left {
                    left: 0.8rem;
                }
                &-right {
                    right: 0.8rem;
                }
            }
            &__brand {
                font: inherit;
                vertical-align: middle;
                line-height: 3.5rem;
                color: white;
            }
        }
        &--circle {
            background: linear-gradient($primaryColor, $secondaryColor);
            height: 10rem;
            border-bottom-left-radius: 100% 200%;
            border-bottom-right-radius: 100% 200%;
        }
    }
    .backdrop {
        position: fixed;
        top: 3.5rem;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 29;
        background-color: $backdropBackground;
    }
}
</style>
