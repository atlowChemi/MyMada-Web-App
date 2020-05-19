<template>
    <div>
        <div class="modal-backdrop" @click="close"></div>
        <div class="modal" :class="{ 'modal-error': error }">
            <div class="modal__content">
                <h1 class="modal__content-title">{{ title || "הגדרות" }}</h1>
                <p v-html="message"></p>
            </div>
            <div class="modal__footer">
                <app-btn
                    v-if="FooterCloseOnly"
                    class="modal__footer-btn flat waves-success"
                    @click="close"
                >אישור</app-btn>
                <div v-else-if="FooterSendToMoked">
                    <app-btn class="modal__footer-btn flat waves-success" @click="close">אישור</app-btn>
                    <app-btn class="modal__footer-btn flat waves-success" @click="close">אישור</app-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AlertType, ModalFooterType } from "../utils/types";
export default {
    props: {
        type: AlertType,
        message: String,
        title: String,
        footer: ModalFooterType
    },
    computed: {
        error() {
            return this.type === AlertType.Error;
        },
        settings() {
            return this.type === AlertType.Settings;
        },
        FooterCloseOnly() {
            return this.footer === ModalFooterType.CloseOnly;
        },
        FooterSendToMoked() {
            return this.footer === ModalFooterType.SendToMoked;
        },
        FooterAddTeamMember() {
            return this.footer === ModalFooterType.AddTeamMember;
        }
    },
    methods: {
        close() {
            this.$store.dispatch("alert/clear");
        }
    }
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: $backdropBackground;
}
.modal {
    $modal: &;
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
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
        0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
    &-error {
        #{ $modal }__content-title {
            color: $primaryError;
        }
    }
    &__content {
        position: absolute;
        padding: 1.5rem;
        padding-top: 0.5rem;
        height: calc(100% - 3.5rem);
        max-height: 100%;
        width: 100%;
        overflow-y: auto;
        &-title {
            font-weight: 400;
            display: block;
            font-size: 2.28rem;
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