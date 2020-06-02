<template>
    <div class="contraction">
        <div class="contraction__number">{{ id }}</div>
        <div class="contraction__content">
            <div class="contraction__content-length">
                <span>{{ $t("tools-page.contractions.length") }} {{ timeString(Math.round((contraction.endTime - contraction.startTime) / 1000)) }}</span>
            </div>
            <div class="contraction__content-elapse">
                <span v-if="contraction.previousEnd">{{ $t("tools-page.contractions.elapse") }} {{ timeString(Math.round((contraction.endTime - contraction.previousEnd) / 1000)) }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Contraction extends Vue {
    @Prop({ required: true }) contraction!: globalThis.Contraction;
    @Prop({ required: true, type: Number }) id!: number;
    timeString(time: number) {
        let minutes: number, seconds: number, minutesOut: any, secondsOut: any;
        time = time % 3600;
        minutes = Math.floor(time / 60);
        time = time % 60;
        seconds = Math.floor(time);
        secondsOut = this.$tc("tools-page.contractions.seconds", seconds);
        if (minutes > 0) {
            minutesOut = this.$tc("tools-page.contractions.minutes", minutes);
        }
        return minutes > 0 ? `${minutesOut}${secondsOut}` : secondsOut;
    }
}
</script>

<style lang="scss" scoped>
.contraction {
    display: flex;
    background-color: white;
    margin: 0.5rem 0;
    border-radius: 15px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    &__number {
        display: flex;
        width: 3rem;
        font-size: 1.1rem;
        border-radius: 0px 15px 15px 0px;
        background-color: $contractionNumber;
        align-items: center;
        justify-content: center;
    }
    &__content {
        padding: 0.5rem;
        &-elapse {
            min-height: 20px;
        }
    }
}
</style>
