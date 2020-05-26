<template>
    <div class="circular-btn" :class="{ metronome }" @click="Click">
        <div class="aspect-ratio-box-inside">
            <div class="circle hoverable" :class="{ working }">
                <div class="circle__mask on-left">
                    <div class="circle__inner"></div>
                </div>
                <div class="circle__mask on-right">
                    <div class="circle__inner"></div>
                </div>
                <div class="circle__holder">
                    <div class="circle__holder-content">
                        <h3><slot /></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component
export default class CircularButton extends Vue {
    @Prop({ type: Boolean, required: false, default: false }) metronome!: boolean;
    working: boolean = false;
    @Emit()
    Click(e: UIEvent) {
        this.working = !this.working;
        return e;
    }
}
</script>

<style lang="scss" scoped>
.circular-btn {
    width: 0;
    padding: 15% 15%;
    height: 0;
    margin: 1rem 0;
    position: relative;
    border-radius: 100%;
    @include tablet {
        margin: auto;
        padding: 35% 35%;
    }
    .aspect-ratio-box-inside {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .circle {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: #e0e0e0;
            border-radius: 100%;
            transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
            &:hover {
                box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }
            &__mask {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                position: absolute;
                left: 0;
                top: 0;
                &.on-left {
                    clip-path: inset(0% 50% 0% 0%);
                    .circle__inner {
                        clip-path: inset(0% 0% 0% 50%);
                    }
                }
                &.on-right {
                    clip-path: inset(0% 0% 0% 50%);
                    .circle__inner {
                        clip-path: inset(0% 50% 0% 0%);
                    }
                }
                .circle__inner {
                    background: $btnHoverColor;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            &__holder {
                position: absolute;
                width: 92%;
                height: 92%;
                left: 4%;
                top: 4%;
                border-radius: 50%;
                background: #fff;
                &-content {
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    line-height: 1;
                    h3 {
                        font-weight: normal;
                        margin: 1rem 0;
                        font-size: 1.8rem;
                    }
                }
            }
            &.working {
                .circle__mask {
                    &.on-left {
                        .circle__inner {
                            animation: circle-left 5s linear 0s infinite;
                        }
                    }
                    &.on-right {
                        .circle__inner {
                            animation: circle-right 5s linear 0s infinite;
                        }
                    }
                }
            }
        }
    }
    &.metronome {
        width: 0;
        padding: 35% 35%;
        height: 0;
        margin: auto;
        @include tablet {
            padding: 0;
            padding-top: 45%;
            width: 45%;
        }
        @include desktop {
            width: 20rem;
            padding-top: 20rem;
        }
        .aspect-ratio-box-inside {
            .circle {
                box-shadow: 0 0 0 7px white;
                &:hover {
                    box-shadow: 0 0 0 7px white, 0 0 12px 12px rgba(0, 0, 0, 0.19);
                }
                &__mask {
                    .circle__inner {
                        background: $homeBtnIcons;
                    }
                }
                &__holder {
                    width: 80%;
                    height: 80%;
                    left: 10%;
                    top: 10%;
                    &-content {
                        h3 {
                            font-size: 3rem;
                        }
                    }
                }
                &.working {
                    animation: metronome 0.6s infinite cubic-bezier(0.18, 0.89, 0.32, 1.28);
                    .circle__mask {
                        &.on-left {
                            .circle__inner {
                                animation-duration: 240s;
                            }
                        }
                        &.on-right {
                            .circle__inner {
                                animation-duration: 240s;
                            }
                        }
                    }
                }
            }
        }
    }
}
@keyframes circle-right {
    0% {
        transform: rotate(0);
    }
    25% {
        transform: rotate(180deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes circle-left {
    0% {
        transform: rotate(0);
    }
    25% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes metronome {
    0% {
        box-shadow: 0 0 0 7px white, 0 0 12px 12px rgba(0, 0, 0, 0.19);
    }
    50% {
        box-shadow: 0 0 0 15px white, 0 0 25px 25px rgba(0, 0, 0, 0.19);
    }
    100% {
        box-shadow: 0 0 0 7px white, 0 0 12px 12px rgba(0, 0, 0, 0.19);
    }
}
</style>
