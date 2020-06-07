<template>
    <div class="metro__valign" @click="startMetronome">
        <div class="metro__valign-row">
            <p class="metro__info">{{ $t("tools-page.metronome.touch") }}</p>
            <circular-button metronome ref="metroBtn" :preWorking="isPlaying">
                {{ activeTime }}
                <p class="round-num">{{ $t("tools-page.metronome.round") }}: {{ round }}</p>
            </circular-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CircularButton from "@/components/CircularButton.vue";
import { playOrPause } from "@/utils/Metronome";

@Component({
    components: {
        CircularButton,
    },
})
export default class Metronome extends Vue {
    runtimeListener = (runningTime: number) => (this.activeTime = runningTime.toString());
    roundCompleteListener = () => this.round++;
    get isPlaying(): boolean {
        return this.$store.state.isMetronomeActive;
    }
    set isPlaying(value: boolean) {
        this.$store.dispatch("setMetronome", value);
    }
    get activeTime(): string {
        return this.$store.state.metronomeActiveTime;
    }
    set activeTime(value) {
        this.$store.dispatch("setMetronomeTime", +value);
    }
    get round(): number {
        return this.$store.state.metronomeRound;
    }
    set round(value: number) {
        this.$store.dispatch("setMetronomeRound", value);
    }
    startMetronome() {
        this.isPlaying = playOrPause(new AudioContext(), this.runtimeListener, this.roundCompleteListener);
        this.round = this.isPlaying ? 1 : 0;
    }
}
</script>

<style lang="scss" scoped>
.metro__valign {
    height: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    text-align: center;
    width: 100%;
    &-row {
        width: 100%;
        padding: 0 0.75rem;
        .metro__info {
            position: relative;
            top: -7vh;
            font-size: 1rem;
        }
        .round-num {
            font-size: 1.1rem;
            margin-top: 0.4rem;
        }
    }
}
</style>
