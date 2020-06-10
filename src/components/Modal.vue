<template>
    <div>
        <div class="modal-backdrop" @click="close(true)"></div>
        <div class="modal" :class="{ 'modal-error': error }">
            <div class="modal__content">
                <h1 class="modal__content-title">{{ title || $t("modals.settings.title") }}</h1>
                <change-name v-if="changeName" />
                <settings v-else-if="settings" />
                <send-to-moked v-else-if="SendToMoked" :msg="message"></send-to-moked>
                <medical-codes v-else-if="MedicalCodePicker"></medical-codes>
                <add-team-member v-else-if="IsAddTeamMember" :member="message" @is-valid="isValidTeamMember"></add-team-member>
                <add-to-dictionary v-else-if="addToDictionary" @is-valid="addToDictionaryEnabled = $event"></add-to-dictionary>
                <p v-else v-html="message"></p>
            </div>
            <div class="modal__footer">
                <div v-if="SendToMoked">
                    <app-btn class="modal__footer-btn flat" v-wave.success @click="sendMsgToMoked" v-t="'common.send'"></app-btn>
                    <app-btn class="modal__footer-btn flat" v-wave.danger @click="close" v-t="'common.cancel'"></app-btn>
                </div>
                <div v-else-if="IsAddTeamMember">
                    <app-btn class="modal__footer-btn flat" v-if="message" v-wave.success @click="AddMember" :disabled="!addTeamBtnEnabled" v-t="'modals.save'"></app-btn>
                    <app-btn class="modal__footer-btn flat" v-else v-wave.success @click="AddMember" :disabled="!addTeamBtnEnabled" v-t="'modals.add'"></app-btn>
                    <app-btn class="modal__footer-btn flat" v-wave.danger @click="close" v-t="'common.cancel'"></app-btn>
                </div>
                <div v-else-if="IsRefreshNeeded">
                    <app-btn class="modal__footer-btn flat" v-wave.success @click="updatePage" v-t="'modals.refresh.update'"></app-btn>
                    <app-btn class="modal__footer-btn flat" v-wave.danger @click="close" v-t="'modals.refresh.not-now'"></app-btn>
                </div>
                <div v-else-if="retrieveContraction">
                    <app-btn class="modal__footer-btn flat" v-wave.success @click="retrieveContractions" v-t="'modals.retrieve.yes'"></app-btn>
                    <app-btn class="modal__footer-btn flat" v-wave.danger @click="noRetrieveContractions" v-t="'common.cancel'"></app-btn>
                </div>
                <div v-else-if="addToDictionary">
                    <app-btn class="modal__footer-btn flat" v-wave.success @click="goAddToDictionary" v-t="'modals.add'" :disabled="!addToDictionaryEnabled"></app-btn>
                    <app-btn class="modal__footer-btn flat" v-wave.danger @click="close" v-t="'common.cancel'"></app-btn>
                </div>
                <md-button :disabled="validateUserName" v-else @click="close(false)">{{ $t("modals.ok") }}</md-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { ModalComponents } from ".";
import Escapable from "@/utils/Escapable";
import { AddToDictionary } from "../utils/firebaseConfig";

@Component({
    components: {
        AddTeamMember: ModalComponents.AddTeamMember,
        AddToDictionary: ModalComponents.AddToDictionary,
        ChangeName: ModalComponents.ChangeName,
        MedicalCodes: ModalComponents.MedicalCodes,
        SendToMoked: ModalComponents.SendToMoked,
        Settings: ModalComponents.Settings,
    },
})
export default class Modal extends Escapable {
    @Prop(String) message!: string;
    @Prop(String) title!: string;
    @Prop() type!: AlertType;
    addTeamBtnEnabled: TeamMember | null = null;
    addToDictionaryEnabled: DictionaryItem | null = null;
    created() {
        this.$on("escaped", () => this.close(true));
    }
    get error(): boolean {
        return this.type === "Error";
    }
    get settings(): boolean {
        return this.type === "Settings";
    }
    get changeName(): boolean {
        return this.type === "ChangeName";
    }
    get SendToMoked(): boolean {
        return this.type === "SendToMoked";
    }
    get MedicalCodePicker(): boolean {
        return this.type === "MedicalCodePicker";
    }
    get IsAddTeamMember(): boolean {
        return this.type === "AddTeamMember";
    }
    get IsRefreshNeeded(): boolean {
        return this.type === "UpdateNeeded";
    }
    get retrieveContraction(): boolean {
        return this.type === "ContractionRetrieve";
    }
    get addToDictionary(): boolean {
        return this.type === "DictionaryAdd";
    }
    get validateUserName(): boolean {
        return this.changeName && !this.$store.getters["user/validUserName"];
    }
    goAddToDictionary() {
        let tempItem = this.addToDictionaryEnabled;
        if (tempItem !== null) {
            this.addToDictionaryEnabled = null;
            AddToDictionary(tempItem)
                .then(() => {
                    this.$store.dispatch("alert/showSnackbar", { show: true, msg: this.$t("modals.add-to-dictionary.good") });
                    this.close(false);
                })
                .catch(() => {
                    this.$store.dispatch("alert/showSnackbar", { show: true, msg: this.$t("modals.add-to-dictionary.err") });
                    this.addToDictionaryEnabled = tempItem;
                });
        }
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
    isValidTeamMember(e: boolean | TeamMember) {
        this.addTeamBtnEnabled = typeof e === "boolean" ? null : e;
    }
    AddMember() {
        if (this.addTeamBtnEnabled && this.addTeamBtnEnabled.name.trim().length > 0) {
            this.$store.dispatch("addTeamMember", { teamMember: this.addTeamBtnEnabled, index: this.message });
            this.$store.dispatch("alert/clear");
        }
    }
    updatePage() {
        window.location.reload(true);
    }
    noRetrieveContractions() {
        this.$store.dispatch("setRetrieveContractions", false);
        this.$store.dispatch("alert/clear");
    }
    retrieveContractions() {
        this.$store.dispatch("setRetrieveContractions", true);
        this.$store.dispatch("alert/clear");
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
        #app.lang-en & {
            text-align: right;
        }
    }
}
</style>
