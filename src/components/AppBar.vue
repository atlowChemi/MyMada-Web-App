<template>
    <header class="main-header">
        <nav class="main-header__nav" @click="closeMenu">
            <div class="main-header__nav-wrapper">
                <a class="main-header__nav-wrapper__button main-header__nav-wrapper__button-start" @click="toggleMenu" v-if="isMobile && currentLoc === 'Tools'">
                    <i class="material-icons">menu</i>
                </a>
                <a class="main-header__nav-wrapper__button main-header__nav-wrapper__button-start" v-else-if="currentLoc !== 'home'" @click="goBack">
                    <i class="material-icons">{{ $i18n.locale === "he" ? "arrow_forward" : "arrow_back" }}</i>
                </a>
                <span class="main-header__nav-wrapper__brand" v-if="title">{{ $t(title) }}</span>
                <span class="main-header__nav-wrapper__brand" v-else>{{ $t("common.app-name") }}</span>
                <a class="main-header__nav-wrapper__button main main-header__nav-wrapper__button-end" @click="openSettings">
                    <i class="material-icons">settings</i>
                </a>
            </div>
            <div class="main-header__nav--circle" v-if="currentLoc === 'home'"></div>
        </nav>
        <tools-menu v-if="currentLoc === 'Tools'" :menuState="menuIsOpen" @close="closeMenu" :openage="openage"></tools-menu>
        <div class="backdrop" @click="closeMenu" v-if="menuIsOpen && isMobile && currentLoc === 'Tools'"></div>
    </header>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { convertRemToPixels } from "@/utils/helperMethods";
import { touchDragger } from "@/utils/TouchEventim";
import ToolsMenu from "@/components/ToolsMenu.vue";

@Component({
    components: {
        ToolsMenu,
    },
})
export default class AppBar extends Vue {
    isMobile: boolean = true;
    menuIsOpen: boolean = false;
    openage: string | undefined = "100";
    @Watch("$route", { immediate: true, deep: true })
    changedRoute(to: any): void {
        touchDragger.dispose();
        if (to.name !== "Tools") {
            this.menuIsOpen = false;
        } else {
            touchDragger.init();
            document.addEventListener("drawertouched", this.draggedEvent);
        }
    }
    @Watch("$i18n.locale", { immediate: true })
    setMenuStartPos() {
        this.openage = this.$i18n.locale === "he" ? "100" : "-100";
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
    toggleMenu(e: Event) {
        this.menuIsOpen = !this.menuIsOpen;
        this.openage = undefined;
        e.stopPropagation();
    }
    closeMenu() {
        if (this.menuIsOpen) {
            this.menuIsOpen = false;
            this.openage = undefined;
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
        if (!this.isMobile) this.openage = "0";
        else if (!this.menuIsOpen) this.setMenuStartPos();
    }
    draggedEvent(e: Event) {
        if (e instanceof CustomEvent) {
            let amount = (e as CustomEvent<DragEventDetails>).detail.x;
            this.openage = String(amount);
            if (Math.abs(amount) <= 99) this.menuIsOpen = true;
            else this.menuIsOpen = false;
        }
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
                &-end {
                    left: 0.8rem;
                }
                &-start {
                    right: 0.8rem;
                }
                #app.lang-en & {
                    &-end {
                        right: 0.8rem;
                        left: unset;
                    }
                    &-start {
                        left: 0.8rem;
                        right: unset;
                    }
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
