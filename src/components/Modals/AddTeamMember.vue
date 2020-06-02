<template>
    <div class="form">
        <md-field md-clearable :class="hasErrors">
            <label>{{ $t("common.name") }}</label>
            <md-input v-model="name"></md-input>
            <span class="md-error">{{ $t("common.name-err") }}</span>
        </md-field>
        <md-field>
            <label for="role">{{ $t("modals.team-member.role") }}</label>
            <md-select @md-selected="IsValid" v-model="role" md-dense :placeholder="$t('modals.team-member.role')" name="role" id="role">
                <md-option value="0">נהג</md-option>
                <md-option value="1">חובש</md-option>
                <md-option value="2">פראמדיק</md-option>
                <md-option value="3">רופא</md-option>
                <md-option value="4">מתנדב</md-option>
                <md-option value="5">משתלם</md-option>
                <md-option value="6">שירות לאומי</md-option>
            </md-select>
        </md-field>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { MedicalRole } from "../../utils/types";

@Component
export default class AddTeamMember extends Vue {
    @Prop({ type: String, required: false, default: undefined }) member!: string;
    private hiddenName: string | null = null;
    role: MedicalRole = MedicalRole.Driver;
    constructor() {
        super();
        if (this.member !== undefined) {
            let member: TeamMember = this.$store.state.teamMembers[+this.member];
            this.name = member.name;
            this.role = member.role;
        }
        this.IsValid();
    }
    get name(): string | null {
        return this.hiddenName!?.trim();
    }
    set name(value: string | null) {
        this.hiddenName = value;
        this.IsValid();
    }
    get hasErrors(): string | null {
        return this.name !== null && this.name!?.length <= 0 ? "md-invalid" : null;
    }
    @Emit()
    IsValid(): boolean | TeamMember {
        if (!this.name) {
            return false;
        } else {
            return { name: this.name, role: this.role };
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-wrap: wrap;
    .md-field {
        width: 100%;
        @include desktop {
            width: 45%;
            margin: 4px 0.8rem 24px;
        }
    }
}
</style>
