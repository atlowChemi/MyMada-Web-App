<template>
    <fragment>
        <frozen-side-bar @grey-mater-clicked="startTimer">
            <template>
                <md-field>
                    <label>דופק ב15 שניות</label>
                    <md-input type="number" min="1" v-model="pulseSeconds"></md-input>
                </md-field>
                <md-field>
                    <label>דופק בדקה</label>
                    <md-input type="number" min="1" v-model="pulseMinutes"></md-input>
                </md-field>
            </template>
            <template #side>
                <div class="pulse-calc">
                    <h1 class="pulse-calc__time">{{ timer }}</h1>
                    <h4 class="pulse-calc__sec">שניות</h4>
                    <p class="pulse-calc__info">לחץ על האזור האפור למדידת דופק</p>
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
export default class Pulse extends Vue {
    timer = 15;
    interval: number | undefined;
    pulseSeconds: number | null = null;
    get pulseMinutes() {
        return this.pulseSeconds ? this.pulseSeconds * 4 : null;
    }
    set pulseMinutes(val) {
        this.pulseSeconds = val ? (val / 4) | 0 : null;
    }
    startTimer() {
        this.timer = 15;
        if (this.interval) {
            this.clearTimer();
        } else {
            let context = new AudioContext();
            let osc = context.createOscillator();
            let gain = context.createGain();
            this.interval = setInterval(() => {
                this.timer--;
                if (this.timer === 0) {
                    osc.type = "sine";
                    osc.frequency.value = 277.2;
                    osc.connect(gain);
                    gain.connect(context.destination);
                    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.9);
                    osc.start();
                    osc.stop(context.currentTime + 0.9);
                    this.clearTimer();
                }
            }, 1000);
        }
    }
    private clearTimer() {
        clearInterval(this.interval);
        this.interval = undefined;
        this.timer = 15;
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
