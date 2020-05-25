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
            <md-field md-clearable>
                <label>מספר ויזה</label>
                <md-input v-model="visa" type="number" min="1" max="9999"></md-input>
                <span class="md-error">לא רשמת מספר ויזה</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable>
                <label>כתובת אירוע</label>
                <md-input v-model="address"></md-input>
                <span class="md-error">לא רשמת מה כתובת האירוע</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': tofesId !== null ? tofesId <= 0 : false }">
                <label>חולה נפגע</label>
                <md-input v-model="tofesId" type="number" min="1" required></md-input>
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
            <md-field md-clearable :class="{ 'md-invalid': name !== null && !name.trim() }">
                <label>שם פרטי</label>
                <md-input v-model="name" required></md-input>
                <span class="md-error">לא רשמת שם פרטי</span>
            </md-field>
        </div>
        <div class="col">
            <md-field md-clearable :class="{ 'md-invalid': family !== null && !family.trim() }">
                <label>שם משפחה</label>
                <md-input v-model="family" required></md-input>
                <span class="md-error">לא רשמת שם משפחה</span>
            </md-field>
        </div>
        <div @click="selectCodes" class="col col__full">
            <md-chips md-static v-model="medicalCodes" :md-limit="5" md-placeholder="קוד רפואי" :class="{ 'md-invalid': wasMedicalCodesFocused && medicalCodes.length <= 0 }">
                <div class="md-helper-text">ניתן לבחור עד 5 קודים</div>
                <span class="md-error">לא בחרת אף קוד רפואי</span>
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
    msg: string | null = null;
    wasMedicalCodesFocused: boolean = false;
    get medicalCodes(): number[] {
        return this.$store.state.selectedMedicalCodes;
    }
    selectCodes() {
        this.wasMedicalCodesFocused = true;
        this.$store.dispatch("alert/medicalCodes", { selectedCodes: this.medicalCodes });
    }
    send() {
        let hasAnyError: boolean = false;
        if (!this.ambulance) {
            this.ambulance = 0;
            hasAnyError = true;
        }
        if (!this.tofesId) {
            this.tofesId = 0;
            hasAnyError = true;
        }
        if ((this.price ? 1 : 0) ^ (this.bill ? 1 : 0)) {
            hasAnyError = true;
        }
        if (!this.name) {
            this.name = "";
            hasAnyError = true;
        }
        if (!this.family) {
            this.family = "";
            hasAnyError = true;
        }
        if (this.medicalCodes.length <= 0) {
            this.wasMedicalCodesFocused = true;
            hasAnyError = true;
        }
        if (!hasAnyError) {
            this.msg = `צוות אמבולנס ${Number(this.ambulance)}\n${this.visa ? `ויזה ${this.visa}\n` : ""}${this.address ? `כתובת ${this.address}\n` : ""}חולה נפגע ${this.tofesId}\n${this.bill ? `התחייבות ${this.bill}\n` : ""}${this.price ? `סכום ${this.price}\n` : ""}שם ${this.name} ${
                this.family
            }\nקוד ${this.medicalCodes.join(",")}`;
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
            margin-bottom: 0.5rem;
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
