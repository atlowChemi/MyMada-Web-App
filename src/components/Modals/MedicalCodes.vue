<template>
    <div class="control">
        <md-autocomplete md-open-on-focus v-model="searchText" :md-options="MedicalCodesSearchList">
            <label>חיפוש</label>
            <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
            </template>
            <template slot="md-autocomplete-empty" slot-scope="{ term }"> לא מצאנו קודים מתאימים לחיפוש: "{{ term }}"</template>
        </md-autocomplete>
        <md-list class="md-dense">
            <div v-for="(mc, index) in FilteredMedicalCodeList" :key="index">
                <md-subheader v-if="!mc.code" :class="GroupName(mc.group)">{{ mc.name }}</md-subheader>
                <md-list-item v-else>
                    <md-checkbox v-model="selectedCodes" :value="mc.code" @change="codeSelected" :disabled="isDisabled(mc.code)" />
                    <span class="md-list-item-text">{{ mc.name }}</span>
                </md-list-item>
            </div>
        </md-list>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { MedicalCodeGroup } from "@/utils/types";
import { MedicalCodes as MedicalCodesList } from "@/utils/helperMethods";

@Component
export default class MedicalCodes extends Vue {
    selectedCodes: number[] = [];
    searchText: string = "";
    constructor() {
        super();
        this.selectedCodes.push(...this.$store.state.selectedMedicalCodes);
    }
    get MedicalCodesSearchList(): string[] {
        return MedicalCodesList.filter(mc => {
            if (mc.code) return mc;
        }).map(mc => mc.name);
    }
    get FilteredMedicalCodeList() {
        return MedicalCodesList.filter(mc => {
            if (!mc.code) return mc;
            return mc.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
    }
    GroupName(grp: MedicalCodeGroup): string {
        return `grp-${MedicalCodeGroup[grp]}`;
    }
    isDisabled(c: number): boolean {
        return this.selectedCodes.length > 4 && !this.selectedCodes.some(code => code === c);
    }
    codeSelected() {
        this.$store.dispatch("setMedicalCodes", { medicalCodes: this.selectedCodes });
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
