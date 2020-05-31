<template>
    <frozen-side-bar @grey-mater-clicked="startTimer">
        <template>
            <md-field>
                <label>דופק ב15 שניות</label>
                <md-input type="number" min="1" v-model="pulseSeconds" @input.native="secInput"></md-input>
            </md-field>
            <md-field>
                <label>דופק בדקה</label>
                <md-input type="number" min="1" v-model="pulseMinutes" @input.native="minInput"></md-input>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FrozenSideBar from "@/components/FrozenSideBar.vue";

@Component({
    components: {
        FrozenSideBar,
    },
})
export default class Pulse extends Vue {
    timer = 15;
    interval: number | undefined;
    context!: AudioContext;
    osc!: OscillatorNode;
    gain!: GainNode;
    pulseSeconds: number | null = null;
    pulseMinutes: number | null = null;
    secInput(e: InputChangeEvent) {
        let sec = e.target.value;
        this.pulseMinutes = sec ? +sec * 4 : null;
    }
    minInput(e: InputChangeEvent) {
        let min = e.target.value;
        this.pulseSeconds = min ? Math.ceil(+min / 4) : null;
    }
    startTimer() {
        this.timer = 15;
        if (this.interval) {
            this.clearTimer();
        } else {
            this.context = new AudioContext();
            this.osc = this.context.createOscillator();
            this.gain = this.context.createGain();
            this.runTimer();
        }
    }
    private runTimer() {
        this.timer--;
        if (this.timer === 0) {
            this.osc.type = "sine";
            this.osc.frequency.value = 277.2;
            this.osc.connect(this.gain);
            this.gain.connect(this.context.destination);
            this.gain.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + 0.9);
            this.osc.start();
            this.osc.stop(this.context.currentTime + 0.9);
            return this.clearTimer();
        }
        this.interval = window.setTimeout(this.runTimer, 1000);
    }
    private clearTimer() {
        window.clearTimeout(this.interval);
        //this.interval = undefined;
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
