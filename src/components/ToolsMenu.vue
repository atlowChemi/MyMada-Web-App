<template>
    <menu class="tools-nav" :class="{ open: menuState }">
        <ul class="tools-nav__menu">
            <li class="tools-nav__menu-item tools-nav__menu-item__large-only" @click="goHome">
                <i class="tools-nav__menu-item__icon material-icons">arrow_forward</i>
                עמוד הבית
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasContractions">
                <router-link to="/tools/contractions">
                    <i class="tools-nav__menu-item__icon icon-contractions"></i>
                    {{ $t("tools-page.contractions.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasPulse">
                <router-link to="/tools/pulse">
                    <i class="tools-nav__menu-item__icon icon-pulse"></i>
                    {{ $t("tools-page.pulse.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasMetronome">
                <router-link to="/tools/metronome">
                    <i class="tools-nav__menu-item__icon icon-metronome"></i>
                    {{ $t("tools-page.metronome.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasVital">
                <router-link to="/tools/vital">
                    <i class="tools-nav__menu-item__icon icon-vital"></i>
                    {{ $t("tools-page.vital.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasOxygen">
                <router-link to="/tools/oxygen">
                    <i class="tools-nav__menu-item__icon icon-oxygen"></i>
                    {{ $t("tools-page.oxygen.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasApgar">
                <router-link to="/tools/apgar">
                    <i class="tools-nav__menu-item__icon icon-apgar"></i>
                    {{ $t("tools-page.apgar.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasGlazgo">
                <router-link to="/tools/glazgo">
                    <i class="tools-nav__menu-item__icon icon-glazgow"></i>
                    {{ $t("tools-page.glazgo.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close" v-if="hasDictionary">
                <router-link to="/tools/dictionary">
                    <i class="tools-nav__menu-item__icon icon-dictionary"></i>
                    {{ $t("tools-page.dictionary.name") }}
                </router-link>
            </li>
        </ul>
        <div class="tools-nav__seperator" v-if="hasProtocoles"></div>
        <p class="tools-nav__title" v-if="hasProtocoles">פרוטוקולים</p>
        <ul class="tools-nav__menu" v-if="hasProtocoles">
            <li class="tools-nav__menu-item" @click="close">
                <router-link to="/tools/als">
                    <i class="tools-nav__menu-item__icon icon-als"></i>
                    {{ $t("tools-page.als.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close">
                <router-link to="/tools/bls">
                    <i class="tools-nav__menu-item__icon icon-bls"></i>
                    {{ $t("tools-page.bls.name") }}
                </router-link>
            </li>
            <li class="tools-nav__menu-item" @click="close">
                <router-link to="/tools/dead">
                    <i class="tools-nav__menu-item__icon icon-dead"></i>
                    {{ $t("tools-page.dead.name") }}
                </router-link>
            </li>
        </ul>
    </menu>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class ToolsMenu extends Vue {
    @Prop({ type: Boolean, required: true, default: false }) readonly menuState!: boolean;
    created() {
        if (!this.$route.params.tool && this.allowedTools.length > 0) {
            let routeTo!: string;
            if (this.hasMetronome) routeTo = "metronome";
            else if (this.hasContractions) routeTo = "contractions";
            else if (this.hasPulse) routeTo = "pulse";
            else if (this.hasVital) routeTo = "vital";
            else if (this.hasOxygen) routeTo = "oxygen";
            else if (this.hasApgar) routeTo = "apgar";
            else if (this.hasGlazgo) routeTo = "glazgo";
            else if (this.hasDictionary) routeTo = "dictionary";
            else if (this.hasProtocoles) routeTo = "bls";
            this.$router.replace(`/tools/${routeTo}`);
        }
    }
    get allowedTools(): string[] {
        return this.$store.state.settings.tools;
    }
    get hasContractions(): boolean {
        return this.allowedTools.includes("contractions");
    }
    get hasPulse(): boolean {
        return this.allowedTools.includes("pulse");
    }
    get hasMetronome(): boolean {
        return this.allowedTools.includes("metronome");
    }
    get hasVital(): boolean {
        return this.allowedTools.includes("vital");
    }
    get hasOxygen(): boolean {
        return this.allowedTools.includes("oxygen");
    }
    get hasApgar(): boolean {
        return this.allowedTools.includes("apgar");
    }
    get hasGlazgo(): boolean {
        return this.allowedTools.includes("glazgo");
    }
    get hasDictionary(): boolean {
        return this.allowedTools.includes("dictionary");
    }
    get hasProtocoles(): boolean {
        return this.allowedTools.includes("protocoles");
    }
    goHome() {
        this.$router.replace("/");
    }
    @Emit()
    close() {
        return true;
    }
}
</script>

<style lang="scss" scoped>
.tools-nav {
    position: fixed;
    z-index: 50;
    right: 0;
    top: 3.5rem;
    bottom: 0;
    width: 19rem;
    background-color: white;
    margin: 0;
    padding: 0;
    transition: transform 0.3s ease-out;
    overflow-y: auto;
    transform: translateX(100%);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    &.open {
        transform: translateX(0%);
    }
    @include desktop {
        transform: translateX(0%);
    }
    &__menu {
        list-style: none;
        padding: 0;
        margin: 0;
        &-item {
            cursor: pointer;
            line-height: 3rem;
            &__large-only {
                @include desktop {
                    display: none;
                }
            }
            & > a {
                display: block;
                color: black;
                &.router-link-active,
                &:hover,
                &:focus {
                    background-color: $background;
                }
            }
            &__icon {
                color: $backdropBackground;
                vertical-align: middle;
                margin: 0 0.7rem 0 1.2rem;
            }
        }
    }
    &__seperator {
        margin: 0.5rem 0 0 0;
        height: 1px;
        overflow: hidden;
        background-color: $background;
    }
    &__title {
        color: $secondaryError;
        padding: 0 1rem;
    }
}
</style>
