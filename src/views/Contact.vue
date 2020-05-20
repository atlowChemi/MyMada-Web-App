<template>
    <div class="contact-page">
        <div class="container main__container">
            <div @click="changeName">
                <md-card md-with-hover>
                    <md-ripple>
                        <md-card-content>לחץ כאן בכדי לשנות את שם התצוגה שלך</md-card-content>
                    </md-ripple>
                </md-card>
            </div>
        </div>
        <footer>
            <b class="seenMsg">טרם נשלחו הודעות</b>
            <div class="container new-msg__container">
                <div class="new-msg__input">
                    <md-field md-clearable :class="hasErrors">
                        <label>כתוב הודעתך כאן</label>
                        <md-textarea v-model="msg" rows="3" required></md-textarea>
                        <span class="md-error">חובה לרשום הודעה!</span>
                    </md-field>
                </div>
                <div class="new-msg__submit">
                    <app-btn class="long waves-light">
                        שלח
                        <i class="material-icons left">send</i>
                    </app-btn>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
const warningMsg = `אנו גוף עצמאי שאינו בקשר עם מד"א. לכן
                <b>אין</b> לשלוח לנו פניות למקרים דחופים הדורשים מענה רפואי.
                <br />כמו כן, איננו קשורים לאפליקציית הצוותים. אין ביכולתנו
                לסייע בה, או לטפל בתקלות בשליחת וקבלת מקרים. <br />עיזרו לנו,
                ואל תיפנו בנושאים שאינם תחום אחריותנו, בכדי שנוכל לתת לכם את
                המענה המיטבי!`;
export default {
    data() {
        return {
            msg: null,
        };
    },
    mounted() {
        this.$store.dispatch("alert/error", {
            message: warningMsg,
            title: "הודעה חשובה",
        });
    },
    computed: {
        hasErrors() {
            return {
                "md-invalid": this.msg?.length <= 0,
            };
        },
    },
    methods: {
        changeName() {
            this.$store.dispatch("alert/changeName");
        },
    },
};
</script>

<style lang="scss" scoped>
.contact-page {
    height: 100%;
    .main__container {
        padding-bottom: 0;
        padding-top: 1rem;
        height: calc(100% - 11.5rem);
        @include desktop {
            height: calc(100% - 8rem);
        }
        .md-card-content {
            padding: 0.5rem;
            text-align: center;
        }
    }
    footer {
        height: 11.5rem;
        text-align: center;
        @include desktop {
            height: 8rem;
            padding-bottom: 0;
        }
        .seenMsg {
            color: $primaryError;
        }
        .new-msg__container {
            padding-bottom: 0;
            @include desktop {
                display: flex;
                align-items: center;
            }
            .new-msg__input {
                @include desktop {
                    width: 66.6666666667%;
                    margin-left: 0.5rem;
                }
            }
            .new-msg__submit {
                @include desktop {
                    width: 33.3333333333%;
                }
                .btn {
                    position: relative;
                    i.material-icons {
                        position: absolute;
                        font-size: 1.3rem;
                        left: 0.7rem;
                        transform: scaleX(-1);
                    }
                }
            }
        }
    }
}
</style>
