<template>
    <div>
        <div class="modal-backdrop" @click="close(true)"></div>
        <div class="modal" :class="{ 'modal-error': error }">
            <div class="modal__content">
                <h1 class="modal__content-title">{{ title || "הגדרות" }}</h1>
                <ChangeName v-if="changeName" />
                <Settings v-else-if="settings" />
                <send-to-moked v-else-if="SendToMoked" :msg="message"></send-to-moked>
                <medical-codes v-else-if="MedicalCodePicker"></medical-codes>
                <add-team-member-component v-else-if="AddTeamMember" @is-valid="isValidTeamMember"></add-team-member-component>
                <p v-else v-html="message"></p>
            </div>
            <div class="modal__footer">
                <div v-if="SendToMoked">
                    <app-btn class="modal__footer-btn flat" v-wave.success @click="sendMsgToMoked">שלח</app-btn>
                    <app-btn class="modal__footer-btn flat" v-wave.danger @click="close">ביטול</app-btn>
                </div>
                <div v-if="AddTeamMember">
                    <app-btn class="modal__footer-btn flat" v-wave.success @click="AddMember" :disabled="!addTeamBtnEnabled">הוסף</app-btn>
                    <app-btn class="modal__footer-btn flat" v-wave.danger @click="close">ביטול</app-btn>
                </div>
                <md-button :disabled="validateUserName" v-else @click="close(false)">אישור</md-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { AlertType } from "../utils/types";

const ChangeName = () => import(/* webpackPrefetch: true */ "@/components/Modals/ChangeName.vue");
const Settings = () => import(/* webpackPrefetch: true */ "@/components/Modals/Settings.vue");
const SendToMoked = () => import(/* webpackPrefetch: true */ "@/components/Modals/SendToMoked.vue");
const MedicalCodes = () => import(/* webpackPrefetch: true */ "@/components/Modals/MedicalCodes.vue");
const AddTeamMemberComponent = () => import(/* webpackPrefetch: true */ "@/components/Modals/AddTeamMember.vue");

@Component({
    components: {
        ChangeName,
        Settings,
        SendToMoked,
        MedicalCodes,
        AddTeamMemberComponent,
    },
})
export default class Modal extends Vue {
    @Prop(String) message!: string;
    @Prop(String) title!: string;
    @Prop() type!: AlertType;
    addTeamBtnEnabled: ITeamMember | null = null;
    get error(): boolean {
        return this.type === AlertType.Error;
    }
    get settings(): boolean {
        return this.type === AlertType.Settings;
    }
    get changeName(): boolean {
        return this.type === AlertType.ChangeName;
    }
    get SendToMoked(): boolean {
        return this.type === AlertType.SendToMoked;
    }
    get MedicalCodePicker(): boolean {
        return this.type === AlertType.MedicalCodePicker;
    }
    get AddTeamMember(): boolean {
        return this.type === AlertType.AddTeamMember;
    }
    get validateUserName(): boolean {
        return this.changeName && !this.$store.getters["user/validUserName"];
    }
    close(backdrop: boolean): void {
        if (this.validateUserName) {
            return;
        }
        if (!backdrop || (backdrop && !this.changeName)) {
            this.$store.dispatch("alert/clear");
        }
    }
    sendMsgToMoked() {
        const mokdim = ["972523993348", "972523993345", "972523993339", "972523993338", "972523993342", "972523993337", "972523993343", "972523993340", "972523993346", "972523993356", "972523993341", "972586309592"];
        const moked = this.$store.state.settings.moked;
        window.open(`sms://+${mokdim[moked]}?&body=${encodeURI(this.message)}`);
    }
    isValidTeamMember(e: boolean | ITeamMember) {
        this.addTeamBtnEnabled = typeof e === "boolean" ? null : e;
    }
    AddMember() {
        console.log("What now?");
    }
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
    background-color: $backdropBackground;
}
.modal {
    $modal: &;
    z-index: 100;
    position: fixed;
    top: 10%;
    left: 0;
    right: 0;
    background-color: $modalBackground;
    height: 70%;
    padding: 0;
    width: 90%;
    max-width: 40rem;
    margin: auto;
    border-radius: 2px;
    will-change: top, opacity;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
    &-error {
        #{ $modal }__content-title {
            color: $primaryError;
        }
    }
    &__content {
        position: absolute;
        padding: 1.5rem;
        // padding-top: 0.5rem;
        height: calc(100% - 3.5rem);
        max-height: 100%;
        width: 100%;
        overflow-y: auto;
        &-title {
            font-weight: 400;
            display: block;
            font-size: 2.28rem;
            line-height: 1.7rem;
            margin: 0 0 0.912rem 0;
        }
    }
    &__footer {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        position: absolute;
        bottom: 0;
        padding: 0.25rem 0.4rem;
        height: 3.5rem;
        width: 100%;
        text-align: left;
        &-btn {
            margin: 0.375rem 0;
        }
    }
}
</style>
