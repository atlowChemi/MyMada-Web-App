<template>
    <frozen-side-bar>
        <template>
            <md-field>
                <label for="tank">{{ $t("tools-page.oxygen.type") }}</label>
                <md-select v-model="tankSize" @md-selected="doCalc" name="tank" id="tank">
                    <md-option :value="2.4">{{ $t("tools-page.oxygen.small") }}</md-option>
                    <md-option :value="20">{{ $t("tools-page.oxygen.big") }}</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label>{{ $t("tools-page.oxygen.atm") }}</label>
                <md-input type="number" min="1" v-model="atm" @input.native="ChangeAtm"></md-input>
            </md-field>
            <md-field>
                <label>{{ $t("tools-page.oxygen.psi") }}</label>
                <md-input type="number" min="1" v-model="psi" @input.native="ChangePSI"></md-input>
            </md-field>
        </template>
        <template #side>
            <div class="oxy-calc">
                <h1 class="oxy-calc__time">{{ calcResult }}</h1>
                <h4 class="oxy-calc__sec">{{ $t("tools-page.oxygen.oxy-time") }}</h4>
                <p class="oxy-calc__info">{{ $t("tools-page.oxygen.by-10-lpm") }}</p>
            </div>
        </template>
    </frozen-side-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FrozenSideBar from "@/components/FrozenSideBar.vue";

@Component({
    components: {
        FrozenSideBar,
    },
})
export default class Oxygen extends Vue {
    tankSize: number = 2.4;
    calcResult: number = 24;
    atm: number | null = 100;
    psi: number | null = 1500;
    ChangePSI(e: InputChangeEvent) {
        let psi = e.target.value;
        this.atm = psi ? (+psi / 15) | 0 : null;
        this.doCalc();
    }
    ChangeAtm(e: InputChangeEvent) {
        let atm = e.target.value;
        this.psi = atm ? +atm * 15 : null;
        this.doCalc();
    }
    doCalc() {
        this.calcResult = Math.round(((this.atm ?? 0) * this.tankSize) / 10);
    }
}
</script>

<style lang="scss" scoped>
.oxy-calc {
    text-align: center;
    color: white;
    &__time {
        font-weight: normal;
        font-size: 3.8rem;
    }
    &__sec {
        font-size: 2rem;
        font-weight: normal;
        margin-bottom: 0.5rem;
    }
    &__info {
        margin: 0;
    }
}
</style>
