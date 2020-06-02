<template>
    <frozen-side-bar light>
        <template>
            <md-field>
                <label for="appearance">{{ $t("tools-page.apgar.appearance.name") }}</label>
                <md-select v-model.number="appearance" name="appearance" id="appearance">
                    <md-option v-for="(item, index) in $t('tools-page.apgar.appearance.score')" :value="index" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="pulse">{{ $t("tools-page.apgar.pulse.name") }}</label>
                <md-select v-model.number="pulse" name="pulse" id="pulse">
                    <md-option v-for="(item, index) in $t('tools-page.apgar.pulse.score')" :value="index" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="grimace">{{ $t("tools-page.apgar.grimace.name") }}</label>
                <md-select v-model.number="grimace" name="grimace" id="grimace">
                    <md-option v-for="(item, index) in $t('tools-page.apgar.grimace.score')" :value="index" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="activity">{{ $t("tools-page.apgar.activity.name") }}</label>
                <md-select v-model.number="activity" name="activity" id="activity">
                    <md-option v-for="(item, index) in $t('tools-page.apgar.activity.score')" :value="index" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="respiration">{{ $t("tools-page.apgar.respiration.name") }}</label>
                <md-select v-model.number="respiration" name="respiration" id="respiration">
                    <md-option v-for="(item, index) in $t('tools-page.apgar.respiration.score')" :value="index" :key="index">{{ item }}</md-option>
                </md-select>
            </md-field>
        </template>
        <template #side>
            <info-card :grade="gradeCalc">{{ $t("tools-page.apgar.score") }}: {{ apgarGrade }}</info-card>
            <info-card>
                <p v-for="(item, index) in $t('tools-page.apgar.info')" :key="index">{{ item }}</p>
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
    appearance: number = 0;
    pulse: number = 0;
    grimace: number = 0;
    activity: number = 0;
    respiration: number = 0;
    get apgarGrade(): number {
        return this.appearance + this.pulse + this.grimace + this.activity + this.respiration;
    }
    get gradeCalc(): number {
        if (this.apgarGrade > 6) return 2;
        if (this.apgarGrade >= 4 && this.apgarGrade <= 6) return 1;
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
