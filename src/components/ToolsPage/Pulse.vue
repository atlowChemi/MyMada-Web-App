<template>
    <fragment>
        <frozen-side-bar>
            <template>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
                <p>p</p>
            </template>
            <template #side>
                <div class="pulse-calc">
                    <h1 class="pulse-calc__time">15</h1>
                    <h4 class="pulse-calc__sec">שניות</h4>
                    <p class="pulse-calc__info">לחץ על האזור האפור למדידת דופק</p>
                </div>
            </template>
        </frozen-side-bar>
    </fragment>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Fragment } from "vue-fragment";
import FrozenSideBar from "@/components/FrozenSideBar.vue";

@Component({
    components: {
        Fragment,
        FrozenSideBar,
    },
})
export default class Contractions extends Vue {
    isActive: boolean = false;
    contractionsBtnClicked() {
        this.isActive = !this.isActive;
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
