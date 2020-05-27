<template>
    <fragment>
        <frozen-side-bar>
            <template>
                <md-field>
                    <label for="tank">סוג בלון חמצן</label>
                    <md-select v-model="tankSize" @md-selected="doCalc" name="tank" id="tank">
                        <md-option :value="2.4">בלון קטן</md-option>
                        <md-option :value="20">בלון גדול</md-option>
                    </md-select>
                </md-field>
                <md-field>
                    <label>לחץ אטמוספרי בבלון</label>
                    <md-input type="number" min="1" v-model="atm"></md-input>
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
    atm: number | null = 100;
    get PSI() {
        return this.atm ? this.atm * 15 : null;
    }
    set PSI(value) {
        this.atm = value ? (value / 15) | 0 : null;
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
