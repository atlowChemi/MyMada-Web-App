<template>
    <div>
        <div class="modal-backdrop" @click="close(true)"></div>
        <div class="modal" :class="{ 'modal-error': error }">
            <div class="modal__content">
                <h1 class="modal__content-title">{{ title || "הגדרות" }}</h1>
                <ChangeName v-if="changeName" />
                <Settings v-else-if="settings" />
                <send-to-moked v-if="SendToMoked" :msg="message"></send-to-moked>
                <p v-else v-html="message"></p>
            </div>
            <div class="modal__footer">
                <md-button :disabled="validateUserName" v-if="FooterCloseOnly" @click="close(false)">אישור</md-button>
                <div v-else-if="SendToMoked">
                    <app-btn class="modal__footer-btn flat waves-success" @click="sendMsgToMoked">שלח</app-btn>
                    <app-btn class="modal__footer-btn flat waves-danger" @click="close">ביטול</app-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { AlertType, ModalFooterType } from "../utils/types";
import ChangeName from "./Modals/ChangeName.vue";
import Settings from "./Modals/Settings.vue";
import SendToMoked from "./Modals/SendToMoked.vue";

@Component({
    components: {
        ChangeName,
        Settings,
        SendToMoked,
    },
})
export default class Modal extends Vue {
    @Prop(String) message!: string;
    @Prop(String) title!: string;
    @Prop() type!: AlertType;
    @Prop() footer!: ModalFooterType;
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
    get FooterCloseOnly(): boolean {
        return this.footer === ModalFooterType.CloseOnly;
    }
    get FooterAddTeamMember(): boolean {
        return this.footer === ModalFooterType.AddTeamMember;
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
        const mokdim = ["972523993348","972523993345","972523993339","972523993338","972523993342","972523993337","972523993343",
            "972523993340","972523993346","972523993356","972523993341","972586309592"];
            const moked = this.$store.state.settings.moked;
            window.open(`sms://+${mokdim[moked]}?&body=${encodeURI(this.message)}`);
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
