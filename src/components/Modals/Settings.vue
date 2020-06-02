<template>
    <div class="container">
        <b>{{ $t("modals.settings.select-tools") }}</b>
        <div class="radio-grid radio-grid__large">
            <md-checkbox v-model="tools" @change="toolsChanged" value="contractions">{{ $t("tools-page.contractions.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="pulse">{{ $t("tools-page.pulse.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="metronome">{{ $t("tools-page.metronome.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="vital">{{ $t("tools-page.vital.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="oxygen">{{ $t("tools-page.oxygen.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="apgar">{{ $t("tools-page.apgar.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="glazgo">{{ $t("tools-page.glazgo.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="dictionary">{{ $t("tools-page.dictionary.name") }}</md-checkbox>
            <md-checkbox v-model="tools" @change="toolsChanged" value="protocoles">{{ $t("tools-page.protocoles.name") }}</md-checkbox>
        </div>
        <b>{{ $t("modals.settings.select-moked") }}</b>
        <div class="radio-grid">
            <md-radio v-model="moked" :value="0">ירושלים</md-radio>
            <md-radio v-model="moked" :value="1">איילון</md-radio>
            <md-radio v-model="moked" :value="2">אשר</md-radio>
            <md-radio v-model="moked" :value="3">גלבוע</md-radio>
            <md-radio v-model="moked" :value="4">דן</md-radio>
            <md-radio v-model="moked" :value="5">ירדן</md-radio>
            <md-radio v-model="moked" :value="6">ירקון</md-radio>
            <md-radio v-model="moked" :value="7">כרמל</md-radio>
            <md-radio v-model="moked" :value="8">לכיש</md-radio>
            <md-radio v-model="moked" :value="9">נגב</md-radio>
            <md-radio v-model="moked" :value="10">שרון</md-radio>
            <md-radio v-model="moked" :value="11">מוקד 4</md-radio>
        </div>
        <b>{{ $t("modals.settings.select-lang") }}</b>
        <div class="centered">
            <md-radio v-model="lang" :value="0">עברית</md-radio>
            <md-radio v-model="lang" :value="1">English</md-radio>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Settings extends Vue {
    private tools: string[] = [];
    constructor() {
        super();
        this.tools.push(...this.$store.state.settings.tools);
        this.moked = this.$store.state.settings.moked;
    }
    toolsChanged(event: string[]) {
        this.$store.dispatch("settings/changeTools", event);
    }
    get moked(): number {
        return this.$store.state.settings.moked;
    }
    set moked(moked: number) {
        this.$store.dispatch("settings/changeMoked", moked);
    }
    get lang(): number {
        return this.$store.state.settings.lang;
    }
    set lang(lang: number) {
        this.$store.dispatch("settings/changeLang", lang);
    }
}
</script>

<style lang="scss" scoped>
.container {
    b {
        display: block;
        text-align: center;
        color: $primaryError;
    }
    .radio-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        @include tablet {
            grid-template-columns: repeat(6, 1fr);
        }
        &__large {
            grid-template-columns: repeat(1, 1fr);
            @include tablet {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    }
    .centered {
        text-align: center;
    }
}
</style>
