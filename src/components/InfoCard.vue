<template>
    <div class="info-card" :class="gradeClass">
        <!--<div class="info-card__icon" v-if="grade === undefined">
            <i class="material-icons">info</i>
        </div>-->
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
    background: rgba($color: $btnColor, $alpha: 0.3);
    color: $primaryColor;
    width: 100%;
    padding: 1rem;
    margin: 0.2rem 2rem;
    border: 0 solid $btnColor;
    .lang-he & {
        border-radius: 8px 4px 4px 8px;
        border-right-width: 4px;
    }
    .lang-en & {
        border-radius: 4px 8px 8px 4px;
        border-left-width: 4px;
    }
    @include tablet {
        margin: 0.5rem 2rem;
    }
    &__text {
        // margin-right: 0.8rem;
        // padding-right: 0.4rem;
        // border-right: 1px solid $btnDisabledColor;
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
        @include transition(background-color 1s linear, border 1s linear, color 1s linear);
        &.grade {
            &-bad {
                border-color: $badShape;
                background-color: rgba($color: $badShape, $alpha: 0.3);
                color: $badShapeTxt;
            }
            &-med {
                border-color: $medShape;
                background-color: rgba($color: $medShape, $alpha: 0.3);
                color: $medShapeTxt;
            }
            &-good {
                border-color: $goodShape;
                background-color: rgba($color: $goodShape, $alpha: 0.3);
                color: $goodShapeTxt;
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
