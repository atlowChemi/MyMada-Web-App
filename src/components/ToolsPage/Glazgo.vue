<template>
    <frozen-side-bar light>
        <template>
            <md-field>
                <label for="eyes">{{ $t("tools-page.glazgo.eyes.name") }}</label>
                <md-select v-model.number="eyes" name="eyes" id="eyes">
                    <md-option v-for="(item, index) in $t('tools-page.glazgo.eyes.score')" :value="index + 1" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="speech">{{ $t("tools-page.glazgo.speech.name") }}</label>
                <md-select v-model.number="speech" name="speech" id="speech">
                    <md-option v-for="(item, index) in $t('tools-page.glazgo.speech.score')" :value="index + 1" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="motor">{{ $t("tools-page.glazgo.motor.name") }}</label>
                <md-select v-model.number="motor" name="motor" id="motor">
                    <md-option v-for="(item, index) in $t('tools-page.glazgo.motor.score')" :value="index + 1" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
        </template>
        <template #side>
            <info-card :grade="gradeCalc">{{ $t("tools-page.glazgo.score") }}: {{ glazgoGrade }} ({{ $t(`tools-page.glazgo.score-state[${gradeCalc}]`) }})</info-card>
            <info-card>
                <p v-for="(item, index) in $t('tools-page.glazgo.info')" :key="index">{{ item }}</p>
            </info-card>
        </template>
    </frozen-side-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FrozenSideBar from "@/components/FrozenSideBar.vue";
import InfoCard from "@/components/InfoCard.vue";

@Component({
    components: {
        FrozenSideBar,
        InfoCard,
    },
})
export default class Apgar extends Vue {
    eyes: number = 1;
    speech: number = 1;
    motor: number = 1;
    get glazgoGrade(): number {
        return this.eyes + this.speech + this.motor;
    }
    get gradeCalc(): number {
        if (this.glazgoGrade > 12) return 2;
        if (this.glazgoGrade >= 9 && this.glazgoGrade <= 12) return 1;
        return 0;
    }
}
</script>

<style lang="scss" scoped>
.age-group-holder {
    text-align: center;
}
.blood-pressure {
    display: flex;
    flex-flow: row-reverse;
    /deep/ .md-field:first-of-type {
        margin-right: 0.5rem;
    }
    /deep/ .md-field:last-of-type {
        margin-left: 0.5rem;
    }
}
</style>
