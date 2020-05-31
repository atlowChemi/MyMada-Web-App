<template>
    <div class="tap-target-wrapper">
        <div class="tap-target" :class="{ open }">
            <div class="tap-target-content">
                <div class="tap-target-content__flex-wrap">
                    <h5>שמור במסך הבית</h5>
                    <p>
                        הדפדפן שלך והמכשיר שמריץ את האתר מאפשרים לך להוסיף את האתר הזה לדף הבית, וכך להשתמש בו כמו אפליקציה לכל דבר ועניין.
                        <br />זה לא דורש הרשאות, ולא תופס מקום אחסון נוסף על המכשיר!<br />להוספה לעמוד הבית לחץ כאן!
                    </p>
                </div>
            </div>
        </div>
        <div class="tap-target-wave" :class="{ open }">
            <md-button @click="addToHome" v-if="open" class="md-fab">
                <md-icon>add_to_home_screen</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class InstallPrompt extends Vue {
    @Prop({ required: true }) open!: BeforeInstallPromptEvent | null;
    openTheFeature: boolean = false;
    @Emit()
    addToHome() {
        return;
    }
}
</script>

<style lang="scss" scoped>
.tap-target-wrapper {
    width: 96%;
    height: 60%;
    position: fixed;
    bottom: 0;
    left: 0;
    @include transition(transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1), -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1));
    @include desktop {
        border-radius: 0 100% 0 0;
        min-width: 35rem;
        width: 55%;
        height: 70%;
    }
    .tap-target {
        background-color: $tapBtnBG;
        opacity: 0.95;
        border-radius: 0 75% 0 0;
        box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.14), 0 10px 50px 0 rgba(0, 0, 0, 0.12), 0 30px 10px -20px rgba(0, 0, 0, 0.2);
        position: absolute;
        font-size: 1rem;
        width: 100%;
        height: 100%;
        @include transition(transform 0.3s cubic-bezier(0.16, 0.61, 0.5, 1));
        @include vendor(transform, translate3d(-100%, 100%, 0));
        &.open {
            @include vendor(transform, translate3d(0, 0, 0));
        }
        &-content {
            display: flex;
            flex: 1 1 auto;
            flex-wrap: wrap;
            min-width: 0;
            align-items: flex-start;
            justify-content: flex-end;
            margin-top: 0.3rem;
            margin-left: 1.2rem;
            flex-direction: row;
            height: 100%;
            color: white;
            @include desktop {
                margin-top: 2.3rem;
            }
            &__flex-wrap {
                height: 100%;
                max-width: 70%;
                max-height: 70%;
                h5 {
                    font-size: 1.7rem;
                    text-align: center;
                    margin-bottom: 0;
                }
            }
        }
    }
    .tap-target-wave {
        position: absolute;
        left: 24px;
        bottom: 24px;
        width: 112px;
        height: 112px;
        border-radius: 50%;
        .md-button {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            margin: 0;
        }
        &.open {
            &:before {
                background-color: #ffffff;
            }
            &:after {
                @include vendor(animation, pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite);
                @include transition(opacity 0.3s, transform 0.3s, visibility 0s 1s, -webkit-transform 0.3s);
                background-color: #ffffff;
            }
        }
        &::before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}
@keyframes pulse-animation {
    0% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    50% {
        opacity: 0;
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
    }
}
</style>
