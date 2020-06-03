<template>
    <div class="info-card" :class="gradeClass">
        <div class="info-card__icon" v-if="grade === undefined">
            <i class="material-icons">info</i>
        </div>
        <div class="info-card__text">
            <slot>{{ $t("common.no-msg") }}</slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class InfoCard extends Vue {
    @Prop({ type: Number, required: false, default: undefined }) grade!: number;
    get gradeClass(): string | null {
        if (this.grade === undefined) return null;
        if (this.grade === 0) return "grade grade-bad";
        else if (this.grade === 1) return "grade grade-med";
        else if (this.grade === 2) return "grade grade-good";
        else return null;
    }
}
</script>

<style lang="scss" scoped>
.info-card {
    $ic: &;
    display: flex;
    flex-flow: row;
    background: white;
    width: 100%;
    border-radius: 8px;
    padding: 1rem;
    margin: 0.2rem 2rem;
    @include tablet {
        margin: 0.5rem 2rem;
    }
    &__text {
        margin-right: 0.8rem;
        padding-right: 0.4rem;
        border-right: 1px solid $btnDisabledColor;
        font-size: 1rem;
        .lang-en & {
            margin-right: 0;
            padding-right: 0;
            margin-left: 0.8rem;
            padding-left: 0.4rem;
            border-right: none;
            border-left: 1px solid $btnDisabledColor;
        }
        p {
            margin: 0;
        }
    }
    &.grade {
        justify-content: center;
        text-align: center;
        @include transition(background-color 1s linear);
        &.grade {
            &-bad {
                background-color: $badShape;
            }
            &-med {
                background-color: $medShape;
            }
            &-good {
                background-color: $goodShape;
            }
        }
        #{ $ic }__text {
            margin: 0;
            padding: 0;
            border: none;
        }
    }
}
</style>
