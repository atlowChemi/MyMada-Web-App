<template>
    <div class="metro__valign">
        <div class="metro__valign-row">
            <p class="metro__info">לחץ בכל נקודה להתחלת המטרונום</p>
            <circular-button metronome @click="startMetronome">
                {{ activeTime }}
                <p class="round-num">סבב: {{ round }}</p>
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
    round: number = 0;
    isPlaying: boolean = false;
    activeTime: string = "00:00";
    startMetronome() {
        this.isPlaying = playOrPause(
            (runningTime: number) => this.getMetroTime(runningTime),
            () => this.round++
        );
        this.round = this.isPlaying ? 1 : 0;
    }
    getMetroTime(runningTime: number) {
        function prettifyTimeString(num: number) {
            return (num < 10 ? "0" : "") + num;
        }
        runningTime = runningTime % 3600;
        let minutes = Math.floor(runningTime / 60);
        runningTime = runningTime % 60;
        let seconds = Math.floor(runningTime);
        this.activeTime = `${prettifyTimeString(minutes)}:${prettifyTimeString(seconds)}`;
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
