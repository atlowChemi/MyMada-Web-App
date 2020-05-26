<template>
    <fragment>
        <frozen-side-bar>
            <template>
                <md-field>
                    <label for="tank">סוג בלון חמצן</label>
                    <md-select v-model="Tank" name="tank" id="tank">
                        <md-option :value="2.4">בלון קטן</md-option>
                        <md-option :value="20">בלון גדול</md-option>
                    </md-select>
                </md-field>
                <md-field>
                    <label>לחץ אטמוספרי בבלון</label>
                    <md-input type="number" min="1" v-model="ATM"></md-input>
                </md-field>
                <md-field>
                    <label>לחץ PSI בבלון</label>
                    <md-input type="number" min="1" v-model="PSI"></md-input>
                </md-field>
            </template>
            <template #side>
                <div class="pulse-calc">
                    <h1 class="pulse-calc__time">{{ calcResult }}</h1>
                    <h4 class="pulse-calc__sec">דקות חמצן</h4>
                    <p class="pulse-calc__info">בחישוב של 10-lpm זרימה.</p>
                </div>
            </template>
        </frozen-side-bar>
    </fragment>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Fragment } from "vue-fragment";
import FrozenSideBar from "@/components/FrozenSideBar.vue";

@Component({
    components: {
        Fragment,
        FrozenSideBar,
    },
})
export default class Oxygen extends Vue {
    tankSize: number = 2.4;
    calcResult: number = 24;
    private atm: number | null = 100;
    private psi: number | null = 1500;
    get Tank() {
        return this.tankSize;
    }
    set Tank(value) {
        this.tankSize = value;
        this.doCalc();
    }
    get ATM() {
        return this.atm;
    }
    set ATM(value) {
        this.atm = value;
        this.psi = value ? value * 15 : null;
        this.doCalc();
    }
    get PSI() {
        return this.psi;
    }
    set PSI(value) {
        this.psi = value;
        this.atm = value ? value / 15 : null;
        this.doCalc();
    }
    doCalc() {
        this.calcResult = Math.round(((this.atm ?? 0) * this.tankSize) / 10);
    }
}
</script>

<style lang="scss" scoped>
.pulse-calc {
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
