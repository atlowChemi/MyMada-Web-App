<template>
    <div class="contraction">
        <div class="contraction__number">{{ id }}</div>
        <div class="contraction__content">
            <div class="contraction__content-length">
                <span>אורך הציר: {{ timeString(Math.round((contraction.endTime - contraction.startTime) / 1000)) }}</span>
            </div>
            <div class="contraction__content-elapse">
                <span v-if="contraction.previousEnd">הפרש מציר קודם: {{ timeString(Math.round((contraction.endTime - contraction.previousEnd) / 1000)) }}</span>
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
        time = time % 3600;
        let minutes: number | string = Math.floor(time / 60);
        time = time % 60;
        let seconds: number | string = Math.floor(time);
        seconds = seconds == 1 ? "שנייה אחת" : `${seconds} שניות`;
        if (minutes > 0) {
            minutes = minutes == 1 ? "דקה ו" : `${minutes} דקות ו`;
        }
        return minutes > 0 ? `${minutes}${seconds}` : seconds;
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
