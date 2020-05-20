<template>
    <div class="container">
        <b>בחר אילו כלים יוצגו בכלי עזר</b>
        <div class="radio-grid radio-grid__large">
            <md-checkbox v-model="array" value="contractions">שעון צירים</md-checkbox>
            <md-checkbox v-model="array" value="pulse">שעון דופק</md-checkbox>
            <md-checkbox v-model="array" value="metronome">מטרונום</md-checkbox>
            <md-checkbox v-model="array" value="vital">מחשבון מדדים</md-checkbox>
            <md-checkbox v-model="array" value="oxygen">מחשבון חמצן</md-checkbox>
            <md-checkbox v-model="array" value="apgar">מחשבון אפגאר</md-checkbox>
            <md-checkbox v-model="array" value="glazgo">מחשבון גלאזגו</md-checkbox>
            <md-checkbox v-model="array" value="dictionary">מילון רפואי</md-checkbox>
            <md-checkbox v-model="array" value="protocoles">פרוטוקולים</md-checkbox>
        </div>
        <b>בחר מרחב ברירת מחדל (לצורך עמוד דיווחים למוקד)</b>
        <div class="radio-grid">
            <md-radio v-model="moked" :value="0">ירושלים</md-radio>
            <md-radio v-model="moked" :value="1">איילון</md-radio>
            <md-radio v-model="moked" :value="2">אשר</md-radio>
            <md-radio v-model="moked" :value="3">גלבוע</md-radio>
            <md-radio v-model="moked" :value="4">דן</md-radio>
            <md-radio v-model="moked" :value="5">ירדן</md-radio>
            <md-radio v-model="moked" :value="6">ירקון</md-radio>
            <md-radio v-model="moked" :value="7">כרמל</md-radio>
            <md-radio v-model="moked" :value="8">לכיש</md-radio>
            <md-radio v-model="moked" :value="9">נגב</md-radio>
            <md-radio v-model="moked" :value="10">שרון</md-radio>
            <md-radio v-model="moked" :value="11">מוקד 4</md-radio>
        </div>
        <b>בחר שפה</b>
        <div class="centered">
            <md-radio v-model="lang" :value="0">עברית</md-radio>
            <md-radio v-model="lang" :value="1">English</md-radio>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Languages, Moked } from "../utils/types";

@Component
export default class Settings extends Vue {
    array: string[] = ["contractions", "pulse", "metronome", "vital", "oxygen", "apgar", "glazgo", "dictionary", "protocoles"];
    public moked: Moked = Moked.Jerusalem;
    public lang: Languages = Languages.he;
}
</script>

<style lang="scss" scoped>
.container {
    b {
        display: block;
        text-align: center;
        color: $primaryError;
    }
    .radio-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        @include desktop {
            grid-template-columns: repeat(6, 1fr);
        }
        &__large {
            grid-template-columns: repeat(1, 1fr);
            @include desktop {
            grid-template-columns: repeat(3, 1fr);
        }
        }
    }
    .centered {
        text-align: center;
    }
}
</style>
