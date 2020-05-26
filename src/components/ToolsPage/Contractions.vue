<template>
    <frozen-side-bar>
        <template #side>
            <circular-button @click="contractionsBtnClicked">{{ isActive ? "סוף ציר" : "תחילת ציר" }}</circular-button>
        </template>
    </frozen-side-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CircularButton from "@/components/CircularButton.vue";
import FrozenSideBar from "@/components/FrozenSideBar.vue";

@Component({
    components: {
        CircularButton,
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

<style lang="scss" scoped></style>
