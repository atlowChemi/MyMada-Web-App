<template>
    <div class="form">
        <md-field md-clearable :class="hasErrors">
            <label>שם</label>
            <md-input v-model="name"></md-input>
            <span class="md-error">לא רשמת שם!</span>
        </md-field>
        <md-field>
            <label for="role">תפקיד בצוות</label>
            <md-select v-model="role" md-dense placeholder="תפקיד בצוות" name="role" id="role">
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
import { Component, Vue } from "vue-property-decorator";
import { MedicalRole } from "../../utils/types";

@Component
export default class AddTeamMember extends Vue {
    name: string | null = null;
    role: MedicalRole = MedicalRole.Driver;
    get hasErrors(): string | null {
        return this.name!?.length <= 0 ? "md-invalid" : null;
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
