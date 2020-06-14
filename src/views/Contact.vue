<template>
    <div class="contact-page">
        <div class="center__page">
            <div class="container main__container">
                <div @click="changeName">
                    <md-card md-with-hover>
                        <md-ripple>
                            <md-card-content>{{ $t("contact-page.change-name-btn") }}</md-card-content>
                        </md-ripple>
                    </md-card>
                </div>
                <md-empty-state v-if="!retrievedMessages" md-icon="chat" :md-label="$t('contact-page.no-message')" :md-description="$t('contact-page.no-message-desc')"></md-empty-state>
                <div v-else :key="lastSent">
                    <contact-message v-for="(msg, key) in retrievedMessages" :key="key" :msg="msg" :name="msg.sender === 'admin' ? $t('contact-page.admin') : name" />
                </div>
                <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showSnackbar">
                    <span>{{ sendingStatus }}</span>
                </md-snackbar>
            </div>
        </div>
        <footer>
            <b class="seenMsg" v-if="seenMsg">{{ seenMsg }}</b>
            <div class="container new-msg__container">
                <div class="new-msg__input">
                    <md-field md-clearable :class="hasErrors">
                        <label>{{ $t("contact-page.write-here") }}</label>
                        <md-textarea v-model="msg" rows="3" required md-autogrow></md-textarea>
                        <span class="md-error">{{ $t("contact-page.msg-required") }}</span>
                    </md-field>
                </div>
                <div class="new-msg__submit">
                    <app-btn long v-wave.light @click="sendMsg" :disabled="sending">
                        {{ $t("common.send") }}
                        <i class="material-icons left">send</i>
                    </app-btn>
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ContactDb } from "../utils/firebaseConfig";
import ContactMessage from "@/components/ContactMessage.vue";

@Component({
    components: {
        ContactMessage,
    },
})
export default class Contact extends Vue {
    sending = false;
    showSnackbar = false;
    sendingStatus: string | any = "";
    msg: string | null = null;
    lastSent!: number;
    seenMsg: string | any = "";
    private retrievedMessages: ContactMessage[] | null = null;
    get fcmToken(): string {
        return this.$store.state.user.fcmToken;
    }
    get name(): string {
        return this.$store.state.user.name;
    }
    get database() {
        return ContactDb(this.fcmToken);
    }
    get hasErrors() {
        return {
            "md-invalid": this.msg!?.length <= 0,
        };
    }
    mounted() {
        this.database.on("value", snapshot => {
            if (snapshot && snapshot.val()) {
                const { Name, SeenByAdmin, LastSent, ...value } = snapshot.val();
                if (!Name) return;
                this.lastSent = LastSent;
                if (SeenByAdmin != null && LastSent != null) {
                    this.retrievedMessages = value;
                    this.seenMsg = SeenByAdmin ? this.$t("contact-page.seen") : this.$t("contact-page.not-seen");
                }
            }
        });
        this.$store.dispatch("alert/error", {
            message: this.$t("contact-page.warning-msg"),
            title: this.$t("contact-page.important-note"),
        });
    }
    changeName() {
        this.$store.dispatch("alert/changeName");
    }
    sendMsg() {
        if (!this.$store.getters["user/validUserName"]) {
            this.$store.dispatch("alert/changeName");
            return;
        }
        if (!this.msg || this.msg.trim().length <= 0) {
            this.msg = "";
            return;
        }
        this.msg = this.msg.trim();
        this.sending = true;
        let msgUpdate = { sender: this.fcmToken, msg: this.msg, time: new Date().getTime() };
        let newPostKey = this.database.push().key;
        //DB.ref().child("chats/" + this.fcmToken).push().key;
        let rootUpdate = { LastSent: new Date().getTime(), SeenByAdmin: false, Name: this.name, [newPostKey ?? ""]: msgUpdate };
        this.database.update(rootUpdate, error => {
            this.sending = false;
            if (error) {
                this.sendingStatus = this.$t("contact-page.send.error");
            } else {
                this.msg = null;
                this.sendingStatus = this.$t("contact-page.send.success");
            }
            this.showSnackbar = true;
        });
    }
}
</script>

<style lang="scss" scoped>
.contact-page {
    height: 100%;
    .center__page {
        height: calc(100% - 11.5rem);
        overflow-y: auto;
        @include tablet {
            height: calc(100% - 8.5rem);
        }
        .main__container {
            padding-bottom: 0;
            padding-top: 1rem;
            .md-empty-state {
                padding: 1rem 0;
            }
            .md-card {
                border-radius: 8px;
                &-content {
                    padding: 0.5rem;
                    text-align: center;
                }
            }
        }
    }
    footer {
        max-height: 11.5rem;
        text-align: center;
        @include tablet {
            height: 8rem;
            padding-bottom: 0;
        }
        .seenMsg {
            color: $primaryError;
        }
        .new-msg__container {
            padding-bottom: 0;
            @include tablet {
                display: flex;
                align-items: center;
            }
            .new-msg__input {
                @include tablet {
                    width: 66.6666666667%;
                    margin-left: 0.5rem;
                    .lang-en & {
                        margin-left: 0;
                        margin-right: 0.5rem;
                    }
                }
            }
            .new-msg__submit {
                @include tablet {
                    width: 33.3333333333%;
                }
            }
        }
    }
}
</style>
