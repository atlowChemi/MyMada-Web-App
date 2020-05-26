<template>
    <div class="metro__valign">
        <div class="metro__valign-row">
            <p class="metro__info">לחץ בכל נקודה להתחלת המטרונום</p>
            <circular-button metronome>00:00</circular-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CircularButton from "@/components/CircularButton.vue";

@Component({
    components: {
        CircularButton,
    },
})
export default class Metronome extends Vue {}
</script>

<style lang="scss" scoped>
.metro__valign {
    height: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    text-align: center;
    width: 100%;
    &-row {
        width: 100%;
        padding: 0 0.75rem;
        .metro__info {
            position: relative;
            top: -7vh;
            font-size: 1rem;
        }
    }
}
</style>
