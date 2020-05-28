<template>
    <frozen-side-bar light>
        <template>
            <div class="age-group-holder">
                <md-radio v-model="ageGroup" :value="0">מבוגר</md-radio>
                <md-radio v-model="ageGroup" :value="1">ילד</md-radio>
                <md-radio v-model="ageGroup" :value="2">תינוק</md-radio>
            </div>
            <md-field :class="{ 'md-invalid': pulse !== null && (pulse < lowPulses[ageGroup] || pulse > highPulses[ageGroup]) }">
                <label>דופק בדקה</label>
                <md-input type="number" v-model="pulse"></md-input>
                <span class="md-error">ישנה חריגה במדדים</span>
            </md-field>
            <md-field :class="{ 'md-invalid': breath !== null && (breath < lowBreathes[ageGroup] || breath > highBreathes[ageGroup]) }">
                <label>נשימות בדקה</label>
                <md-input type="number" v-model="breath"></md-input>
                <span class="md-error">ישנה חריגה במדדים</span>
            </md-field>
            <div class="blood-pressure">
                <md-field :class="{ 'md-invalid': systolic !== null && (systolic < lowSystolic[ageGroup] || systolic > highSystolic[ageGroup]) }">
                    <label>סיסטולי</label>
                    <md-input type="number" v-model="systolic"></md-input>
                    <span class="md-error">ישנה חריגה במדדים</span>
                </md-field>
                <md-field :class="{ 'md-invalid': diastolic !== null && (diastolic < lowDiastolic[ageGroup] || diastolic > highDiastolic[ageGroup]) }">
                    <label>דיאסטולי</label>
                    <md-input type="number" v-model="diastolic"></md-input>
                    <span class="md-error">ישנה חריגה במדדים</span>
                </md-field>
            </div>
        </template>
        <template #side>
            <info-card>
                <p>מדדים תקינים ב{{ ages[ageGroup] }} הם:</p>
                <p>דופק: {{ lowPulses[ageGroup] }}-{{ highPulses[ageGroup] }}</p>
                <p>נשימות: {{ lowBreathes[ageGroup] }}-{{ highBreathes[ageGroup] }}</p>
                <p>לחץ דם: {{ lowSystolic[ageGroup] }}-{{ highSystolic[ageGroup] }}/{{ lowDiastolic[ageGroup] }}-{{ highDiastolic[ageGroup] }}</p>
            </info-card>
            <info-card>טווח המדדים המופיעים כאן הינו על פי הנתונים בספרי מד"א ואינו מדויק אצל מטופלים בעלי רקע רפואי. האמור כאן אינו מהווה יעוץ רפואי.</info-card>
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
export default class Oxygen extends Vue {
    readonly ages: string[] = ["מבוגר", "ילד", "תינוק"];
    readonly lowPulses: number[] = [60, 90, 125];
    readonly highPulses: number[] = [100, 120, 130];
    readonly lowBreathes: number[] = [12, 18, 22];
    readonly highBreathes: number[] = [20, 30, 60];
    readonly lowSystolic: number[] = [90, 90, 60];
    readonly highSystolic: number[] = [140, 110, 90];
    readonly lowDiastolic: number[] = [60, 50, 40];
    readonly highDiastolic: number[] = [90, 80, 60];
    ageGroup: number = 0;
    pulse: number | null = null;
    breath: number | null = null;
    systolic: number | null = null;
    diastolic: number | null = null;
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
