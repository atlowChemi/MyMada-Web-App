<template>
    <div class="container">
        <md-field md-clearable :class="hasErrors">
            <label>מספר אמבולנס</label>
            <md-input v-model="ambulance" type="number" required min="1" max="9999"></md-input>
            <span class="md-error">לא רשמת מספר אמבולנס</span>
        </md-field>
        <div class="team-holder">
            <team-member v-for="index in teamMembersCount" :key="index" :index="index - 1"></team-member>
        </div>
        <div class="btn-holder">
            <div class="teams">
                <app-btn long light @click="addTeamMembers" v-if="teamMembersCount < 4">הוספת איש צוות</app-btn>
            </div>
            <div class="sender">
                <app-btn :disabled="teamMembersCount <= 0" v-wave.light long @click="send">
                    שלח
                    <i class="material-icons">send</i>
                    <md-tooltip md-direction="bottom">כלי זה פועל באמצעות סמס</md-tooltip>
                </app-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { MedicalRolesNames } from "../../utils/helperMethods";
const TeamMemberData = () => import(/* webpackPrefetch: true */ "@/components/TeamMember.vue");

@Component({
    components: {
        TeamMemberData,
    },
})
export default class Team extends Vue {
    ambulance: string | null = null;
    msg: string | null = null;
    get hasErrors() {
        return {
            "md-invalid": this.ambulance !== null && +this.ambulance <= 0,
        };
    }
    get teamMembersCount(): number {
        return this.$store.getters.teamMemberCount;
    }
    get teamMembers(): string {
        let members: TeamMember[] = this.$store.state.teamMembers;
        let res: string = "";
        for (const member of members) {
            res += `\n${member.name} - ${MedicalRolesNames[member.role]}`;
        }
        return res;
    }
    addTeamMembers() {
        this.$store.dispatch("alert/addTeamMember", null);
    }
    send() {
        if (this.ambulance === null) {
            this.ambulance = "";
        } else if (this.teamMembersCount > 0) {
            this.msg = `צוות אמבולנס ${this.ambulance.trim()}\n${this.teamMembers}`;
            this.MessageSent();
        }
    }
    @Emit()
    MessageSent() {
        return this.msg;
    }
}
</script>

<style lang="scss" scoped>
.team-holder {
    display: flex;
    flex-wrap: wrap;
    margin: 2rem 0;
    justify-content: center;
}
.btn-holder {
    display: flex;
    flex-direction: column;
    @include desktop {
        flex-direction: row;
    }
    .teams {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
        @include desktop {
            width: 66.6666666667%;
            margin: 0 0.5rem;
        }
    }
    .sender {
        margin: 0.5rem 0;
        width: 100%;
        @include desktop {
            margin: 0 0.5rem;
            width: 33.3333333333%;
        }
    }
}
</style>
