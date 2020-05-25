<template>
    <div class="control">
        <md-list class="md-dense">
            <fragment v-for="(mc, index) in MedicalCodesList" :key="index">
                <md-subheader v-if="!mc.code" :class="GroupName(mc.group)">{{ mc.name }}</md-subheader>
                <md-list-item v-else>
                    <md-checkbox v-model="selectedCodes" :value="mc.code" @change="codeSelected" :disabled="isDisabled(mc.code)" />
                    <span class="md-list-item-text">{{ mc.name }}</span>
                </md-list-item>
            </fragment>
        </md-list>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Fragment } from "vue-fragment";
import { MedicalCodeGroup } from "@/utils/types";
import { MedicalCodes as MedicalCodesList } from "@/utils/helperMethods";

@Component({
    components: { Fragment },
})
export default class MedicalCodes extends Vue {
    selectedCodes: number[] = [];
    get MedicalCodesList() {
        return MedicalCodesList;
    }
    GroupName(grp: MedicalCodeGroup): string {
        return `grp-${MedicalCodeGroup[grp]}`;
    }
    isDisabled(c: number): boolean {
        return this.selectedCodes.length > 4 && !this.selectedCodes.some(code => code === c);
    }
    @Emit()
    codeSelected() {
        return this.selectedCodes;
    }
}
</script>

<style lang="scss" scoped>
.control {
    & /deep/ .md-list {
        @include medicalCodeSelectors("Area", $AreaGroup);
        @include medicalCodeSelectors("Trauma", $TraumaGroup);
        @include medicalCodeSelectors("Pain", $PainGroup);
        @include medicalCodeSelectors("Cardio", $CardioGroup);
        @include medicalCodeSelectors("Pulmonary", $PulmonaryGroup);
        @include medicalCodeSelectors("Neurology", $NeurologyGroup);
        @include medicalCodeSelectors("Digestion", $DigestionGroup);
        @include medicalCodeSelectors("Septic", $SepticGroup);
        @include medicalCodeSelectors("Psychiatry", $PsychiatryGroup);
        @include medicalCodeSelectors("Endocrinology", $EndocrinologyGroup);
        @include medicalCodeSelectors("Genital", $GenitalGroup);
        @include medicalCodeSelectors("General", $GeneralGroup);
    }
}
</style>
