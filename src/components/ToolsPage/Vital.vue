<template>
    <frozen-side-bar light>
        <template>
            <div class="age-group-holder">
                <md-radio v-model="ageGroup" :value="0">{{ $t("tools-page.vital.ages[0]") }}</md-radio>
                <md-radio v-model="ageGroup" :value="1">{{ $t("tools-page.vital.ages[1]") }}</md-radio>
                <md-radio v-model="ageGroup" :value="2">{{ $t("tools-page.vital.ages[2]") }}</md-radio>
            </div>
            <md-field :class="{ 'md-invalid': pulse !== null && (pulse < lowPulses[ageGroup] || pulse > highPulses[ageGroup]) }">
                <label>{{ $t("tools-page.vital.pulse") }} {{ $t("tools-page.vital.min") }}</label>
                <md-input type="number" v-model="pulse"></md-input>
                <span class="md-error">{{ $t("tools-page.vital.range") }}</span>
            </md-field>
            <md-field :class="{ 'md-invalid': breath !== null && (breath < lowBreathes[ageGroup] || breath > highBreathes[ageGroup]) }">
                <label>{{ $t("tools-page.vital.breath") }} {{ $t("tools-page.vital.min") }}</label>
                <md-input type="number" v-model="breath"></md-input>
                <span class="md-error">{{ $t("tools-page.vital.range") }}</span>
            </md-field>
            <div class="blood-pressure">
                <md-field :class="{ 'md-invalid': systolic !== null && (systolic < lowSystolic[ageGroup] || systolic > highSystolic[ageGroup]) }">
                    <label>{{ $t("tools-page.vital.sys") }}</label>
                    <md-input type="number" v-model="systolic"></md-input>
                    <span class="md-error">{{ $t("tools-page.vital.range") }}</span>
                </md-field>
                <md-field :class="{ 'md-invalid': diastolic !== null && (diastolic < lowDiastolic[ageGroup] || diastolic > highDiastolic[ageGroup]) }">
                    <label>{{ $t("tools-page.vital.dys") }}</label>
                    <md-input type="number" v-model="diastolic"></md-input>
                    <span class="md-error">{{ $t("tools-page.vital.range") }}</span>
                </md-field>
            </div>
        </template>
        <template #side>
            <info-card>
                <p>{{ $t("tools-page.vital.propper", { age: ages[ageGroup] }) }}</p>
                <p>{{ $t("tools-page.vital.pulse") }}: {{ lowPulses[ageGroup] }}-{{ highPulses[ageGroup] }}</p>
                <p>{{ $t("tools-page.vital.breath") }}: {{ lowBreathes[ageGroup] }}-{{ highBreathes[ageGroup] }}</p>
                <p>{{ $t("tools-page.vital.bp") }}: {{ lowSystolic[ageGroup] }}-{{ highSystolic[ageGroup] }}/{{ lowDiastolic[ageGroup] }}-{{ highDiastolic[ageGroup] }}</p>
            </info-card>
            <info-card>{{ $t("tools-page.vital.clarify") }}</info-card>
        </template>
    </frozen-side-bar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import FrozenSideBar from "@/components/FrozenSideBar.vue";
import InfoCard from "@/components/InfoCard.vue";

@Component({
    components: {
        FrozenSideBar,
        InfoCard,
    },
})
export default class Oxygen extends Vue {
    readonly lowPulses: number[] = [60, 90, 125];
    readonly highPulses: number[] = [100, 120, 130];
    readonly lowBreathes: number[] = [12, 18, 22];
    readonly highBreathes: number[] = [20, 30, 60];
    readonly lowSystolic: number[] = [90, 90, 60];
    readonly highSystolic: number[] = [140, 110, 90];
    readonly lowDiastolic: number[] = [60, 50, 40];
    readonly highDiastolic: number[] = [90, 80, 60];
    ages: any;
    ageGroup: number = 0;
    pulse: number | null = null;
    breath: number | null = null;
    systolic: number | null = null;
    diastolic: number | null = null;
    created() {
        this.ages = this.$t("tools-page.vital.ages");
    }
    @Watch("$i18n.locale")
    fixAges() {
        this.ages = this.$t("tools-page.vital.ages");
    }
}
</script>

<style lang="scss" scoped>
.age-group-holder {
    text-align: center;
}
.blood-pressure {
    display: flex;
    flex-flow: column;
    @include tablet {
        flex-flow: row-reverse;
    }
    /deep/ .md-field:first-of-type {
        @include tablet {
            margin: 0;
            margin-right: 0.5rem;
            .lang-en & {
                margin: 0;
                margin-left: 0.5rem;
            }
        }
    }
    /deep/ .md-field:last-of-type {
        @include tablet {
            margin: 0;
            margin-left: 0.5rem;
            .lang-en & {
                margin: 0;
                margin-right: 0.5rem;
            }
        }
    }
}
</style>
