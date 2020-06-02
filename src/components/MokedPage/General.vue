<template>
    <div class="container">
        <md-field md-clearable :class="hasErrors">
            <label>{{ $t("moked-page.general.name") }}</label>
            <md-textarea v-model="msg" md-autogrow required></md-textarea>
            <span class="md-error">{{ $t("moked-page.general.err") }}</span>
        </md-field>
        <app-btn v-wave.light long @click="send">
            {{ $t("common.send") }}
            <i class="material-icons">send</i>
            <md-tooltip md-direction="bottom">{{ $t("moked-page.via-sms") }}</md-tooltip>
        </app-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class General extends Vue {
    msg: string | null = null;
    get hasErrors() {
        return {
            "md-invalid": this.msg!?.trim().length <= 0,
        };
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

<style lang="scss">
#tab-posts {
    .md-field .md-textarea {
        max-height: 10rem;
    }
}
</style>
