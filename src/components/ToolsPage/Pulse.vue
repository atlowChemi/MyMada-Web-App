<template>
    <fragment>
        <frozen-side-bar>
            <template>
                <md-field>
                    <label>דופק ב15 שניות</label>
                    <md-input type="number" min="1" v-model="pulseSeconds"></md-input>
                </md-field>
                <md-field>
                    <label>דופק בדקה</label>
                    <md-input type="number" min="1" v-model="pulseMinute"></md-input>
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
    private pSeconds: number | null = null;
    private pMinute: number | null = null;
    get pulseSeconds() {
        return this.pSeconds ? Math.ceil(this.pSeconds) : null;
    }
    set pulseSeconds(value) {
        this.pSeconds = value;
        this.pMinute = value ? value * 4 : null;
    }
    get pulseMinute() {
        return this.pMinute;
    }
    set pulseMinute(value) {
        this.pMinute = value;
        this.pSeconds = value ? value / 4 : null;
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
