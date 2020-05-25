<template>
    <div class="container">
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': ambulance !== null && ambulance <= 0 }">
                <label>מספר אמבולנס</label>
                <md-input v-model="ambulance" type="number" required min="1" max="9999"></md-input>
                <span class="md-error">לא רשמת מספר אמבולנס</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': visa !== null ? visa <= 0 : false }">
                <label>מספר ויזה</label>
                <md-input v-model="visa" type="number" min="1" max="9999"></md-input>
                <span class="md-error">לא רשמת מספר ויזה</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': address !== null && address.trim() }">
                <label>כתובת אירוע</label>
                <md-input v-model="address" type="number"></md-input>
                <span class="md-error">לא רשמת מה כתובת האירוע</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': tofesId !== null ? tofesId <= 0 : false }">
                <label>חולה נפגע</label>
                <md-input v-model="visa" type="number" min="1" required></md-input>
                <span class="md-error">לא רשמת מספר טופס חולה נפגע</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': !bill && price }">
                <label>התחייבות</label>
                <md-input v-model="bill" type="number" min="1"></md-input>
                <span class="md-error">לא ניתן לרשום סכום בלי התחייבות</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': !price && bill }">
                <label>סכום</label>
                <md-input v-model="price" type="number" min="1" max="5000"></md-input>
                <span class="md-error">לא ניתן לרשום התחייבות בלי סכום</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': name !== null && name.trim() }">
                <label>שם פרטי</label>
                <md-input v-model="name" required></md-input>
                <span class="md-error">לא רשמת שם פרטי</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': family !== null && family.trim() }">
                <label>שם משפחה</label>
                <md-input v-model="family" required></md-input>
                <span class="md-error">לא רשמת שם משפחה</span>
            </md-field>
        </div>
        <div @click="selectCodes" class="col col__full">
            <md-chips md-static v-model="medicalCodes" :md-limit="5" md-placeholder="קוד רפואי">
                <div class="md-helper-text">ניתן לבחור עד 5 קודים</div>
            </md-chips>
        </div>
        <app-btn class="waves-light sendBtn" long @click="send">
            שלח
            <i class="material-icons">send</i>
            <md-tooltip md-direction="bottom">כלי זה פועל באמצעות סמס</md-tooltip>
        </app-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class Forms extends Vue {
    ambulance: number | null = null;
    visa: number | null = null;
    address: string | null = null;
    tofesId: number | null = null;
    bill: number | undefined | null = null;
    price: number | undefined | null = null;
    name: string | null = null;
    family: string | null = null;
    medicalCodes: string[] = [];
    msg: string | null = null;
    selectCodes() {
        this.$store.dispatch("alert/medicalCodes", {selectedCodes: this.medicalCodes});
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
.container {
    .col {
        display: inline-block;
        padding: 0 0.75rem;
        width: 100%;
        @media (min-width: 37.5rem) {
            width: 50%;
        }
        @media (min-width: 62rem) {
            width: 25%;
        }
        &__full {
            width: 100%;
        }
    }
    .sendBtn {
        margin-top: 2rem;
    }
    .pulse-on-error::v-deep .md-duplicated {
        animation-name: pulse;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
    }

    @keyframes pulse {
        0% {
            transform: scale(1.1, 1.1);
        }
        100% {
            transform: scale(0.9, 0.9);
        }
    }
}
</style>
