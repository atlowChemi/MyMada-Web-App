<template>
    <frozen-side-bar light>
        <template>
            <md-field>
                <label for="appearance">הופעה / צבע</label>
                <md-select v-model.number="appearance" name="appearance" id="appearance">
                    <md-option :value="0">כחול - חיוור</md-option>
                    <md-option :value="1">ורוד, גפיים כחולות</md-option>
                    <md-option :value="2">ורוד</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="pulse">דופק</label>
                <md-select v-model.number="pulse" name="pulse" id="pulse">
                    <md-option :value="0">אין דופק</md-option>
                    <md-option :value="1">דופק איטי מ100</md-option>
                    <md-option :value="2">דופק מעל 100</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="grimace">העוויות</label>
                <md-select v-model.number="grimace" name="grimace" id="grimace">
                    <md-option :value="0">אין תגובה</md-option>
                    <md-option :value="1">העוויות</md-option>
                    <md-option :value="2">בכי / שיעול</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="activity">הנעת גפיים</label>
                <md-select v-model.number="activity" name="activity" id="activity">
                    <md-option :value="0">גפיים רפויות</md-option>
                    <md-option :value="1">תנועות קלות</md-option>
                    <md-option :value="2">תנועות נמרצות</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="respiration">נשימה</label>
                <md-select v-model.number="respiration" name="respiration" id="respiration">
                    <md-option :value="0">אין נשימה</md-option>
                    <md-option :value="1">נשימה חלשה / איטית</md-option>
                    <md-option :value="2">בכי חזק</md-option>
                </md-select>
            </md-field>
        </template>
        <template #side>
            <info-card :grade="gradeCalc">ציון אפגאר הוא: {{ apgarGrade }}</info-card>
            <info-card>
                <p>יילוד בציון נמוך מ4 זקוק להחייאה מיידית.</p>
                <p>ניקוד בין 4 ל6 מסמן על יילוד במצוקה בינונית הזקוק לחמצון והמרצה.</p>
                <p>ניקוד גבוה מ6 הינו אינדיקציה ליילוד תקין.</p>
            </info-card>
        </template>
    </frozen-side-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FrozenSideBar from "@/components/FrozenSideBar.vue";
import InfoCard from "@/components/InfoCard.vue";

@Component({
    components: {
        FrozenSideBar,
        InfoCard,
    },
})
export default class Apgar extends Vue {
    appearance: number = 0;
    pulse: number = 0;
    grimace: number = 0;
    activity: number = 0;
    respiration: number = 0;
    get apgarGrade(): number {
        return this.appearance + this.pulse + this.grimace + this.activity + this.respiration;
    }
    get gradeCalc(): number {
        if (this.apgarGrade > 6) return 2;
        if (this.apgarGrade >= 4 && this.apgarGrade <= 6) return 1;
        return 0;
    }
}
</script>

<style lang="scss" scoped>
.age-group-holder {
    text-align: center;
}
.blood-pressure {
    display: flex;
    flex-flow: row-reverse;
    /deep/ .md-field:first-of-type {
        margin-right: 0.5rem;
    }
    /deep/ .md-field:last-of-type {
        margin-left: 0.5rem;
    }
}
</style>
