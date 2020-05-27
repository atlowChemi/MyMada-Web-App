<template>
    <fragment>
        <frozen-side-bar @grey-mater-clicked="startTimer">
            <template>
                <md-field>
                    <label>דופק ב15 שניות</label>
                    <md-input type="number" min="1" :value="pulseMinutes ? Math.ceil(pulseMinutes / 4) : null" @input="InputSeconds"></md-input>
                </md-field>
                <md-field>
                    <label>דופק בדקה</label>
                    <md-input type="number" min="1" :value="pulseMinutes" @input="InputMinutes"></md-input>
                </md-field>
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
export default class Pulse extends Vue {
    timer = 15;
    pulseMinutes: number | null = null;
    InputSeconds(val: number) {
        this.pulseMinutes = val * 4;
    }
    InputMinutes(val: number) {
        this.pulseMinutes = val;
    }
    startTimer() {
        setInterval(() => {
            
        }, 1000);
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
