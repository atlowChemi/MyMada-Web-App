<template>
    <div class="contact-page">
        <div class="center__page">
            <div class="container main__container">
                <div @click="changeName">
                    <md-card md-with-hover>
                        <md-ripple>
                            <md-card-content>לחץ כאן בכדי לשנות את שם התצוגה שלך</md-card-content>
                        </md-ripple>
                    </md-card>
                </div>
                <md-empty-state v-if="!retrievedMessages" md-icon="chat" md-label="לא קיימות הודעות" md-description="לא הצלחנו לזהות הודעות שנשלחו ממכשיר זה. תוכל לשלוח לנו הודעה מעמוד זה."></md-empty-state>
                <div v-else :key="lastSent">
                    <contact-message v-for="(msg, key) in retrievedMessages" :key="key" :msg="msg" :name="msg.sender === 'admin' ? 'מנהל' : name" />
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
                        <label>כתוב הודעתך כאן</label>
                        <md-textarea v-model="msg" rows="3" required md-autogrow></md-textarea>
                        <span class="md-error">חובה לרשום הודעה!</span>
                    </md-field>
                </div>
                <div class="new-msg__submit">
                    <app-btn long v-wave.light @click="sendMsg" :disabled="sending">
                        שלח
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

const warningMsg = `אנו גוף עצמאי שאינו בקשר עם מד"א. לכן
                <b>אין</b> לשלוח לנו פניות למקרים דחופים הדורשים מענה רפואי.
                <br />כמו כן, איננו קשורים לאפליקציית הצוותים. אין ביכולתנו
                לסייע בה, או לטפל בתקלות בשליחת וקבלת מקרים. <br />עיזרו לנו,
                ואל תיפנו בנושאים שאינם תחום אחריותנו, בכדי שנוכל לתת לכם את
                המענה המיטבי!`;

@Component({
    components: {
        ContactMessage,
    },
})
export default class Contact extends Vue {
    sending = false;
    showSnackbar = false;
    sendingStatus = "";
    msg: string | null = null;
    lastSent!: number;
    seenMsg: string = "";
    private retrievedMessages: { [key: string]: { msg: string; sender: string; time: number; WhatsApp?: boolean } } | null = null;
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
                this.retrievedMessages = value;
                if (typeof SeenByAdmin !== undefined) {
                    this.seenMsg = SeenByAdmin ? "מנהל ראה את ההודעה שלך" : "מנהל טרם ראה את ההודעה";
                }
            }
        });
        this.$store.dispatch("alert/error", {
            message: warningMsg,
            title: "הודעה חשובה",
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
                this.sendingStatus = "ההודעה לא נשלחה. אנא נסה שוב!";
            } else {
                this.msg = null;
                this.sendingStatus = "ההודעה נשלחה בהצלחה!";
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
