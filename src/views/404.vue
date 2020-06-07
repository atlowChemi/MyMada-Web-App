<template>
    <div class="not-found">
        <h1 class="not-found__title" v-t="'404.info'"></h1>
        <div class="not-found__ecg">
            <div class="not-found__ecg-slider"></div>
        </div>
        <p class="not-found__info" v-html="$t('404.details')"></p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Err404 extends Vue {}
</script>

<style lang="scss" scoped>
.not-found {
    position: absolute;
    top: 25%;
    right: 3px;
    left: 3px;
    &__title {
        margin: 10px auto;
        text-align: center;
        font: 28pt bold;
        color: #10133c;
        font-family: "Heebo", serif;
    }
    &__ecg {
        height: 9.2rem;
        background: $homeBtnIcons left center / contain repeat-x url("../assets/images/ecg.webp");
        width: 100%;
        overflow: hidden;
        position: relative;
        &-slider {
            position: absolute;
            height: 100%;
            width: 5%;
            background-color: $homeBtnIcons;
            @include vendor(animation, blinker 3s linear infinite);
        }
    }
    &__info {
        font-size: 1.6rem;
        line-height: 1.2;
        color: #10133c;
        margin: 35px auto;
        text-align: center;
    }
}
@keyframes blinker {
    0% {
        left: 0;
    }
    100% {
        left: 100%;
    }
}
</style>
