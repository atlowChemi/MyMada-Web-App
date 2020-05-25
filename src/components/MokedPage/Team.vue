<template>
    <div class="container">
        <md-field md-clearable :class="hasErrors">
            <label>מספר אמבולנס</label>
            <md-input v-model="ambulance" type="number" required min="1" max="9999"></md-input>
            <span class="md-error">לא רשמת מספר אמבולנס</span>
        </md-field>
        <div class="btn-holder">
            <div class="teams">
                <app-btn long light @click="addTeamMembers">הוספת איש צוות</app-btn>
            </div>
            <div class="sender">
                <app-btn long @click="send">
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

@Component
export default class Team extends Vue {
    ambulance: number | null = null;
    msg: string | null = null;
    get hasErrors() {
        return {
            "md-invalid": this.ambulance !== null && this.ambulance <= 0,
        };
    }
    addTeamMembers() {
        this.$store.dispatch("alert/addTeamMember", null)
    }
    send() {
        this.msg = this.msg === null ? "" : this.msg.trim();
        if (this.msg) {
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
