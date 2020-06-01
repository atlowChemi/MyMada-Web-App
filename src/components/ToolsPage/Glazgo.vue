<template>
    <frozen-side-bar light>
        <template>
            <md-field>
                <label for="eyes">פקיחת עיניים</label>
                <md-select v-model.number="eyes" name="eyes" id="eyes">
                    <md-option :value="1">אין</md-option>
                    <md-option :value="2">פתיחת עיניים בכאב</md-option>
                    <md-option :value="3">ציות להוראה</md-option>
                    <md-option :value="4">ספונטנית</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="speech">דיבור</label>
                <md-select v-model.number="speech" name="speech" id="speech">
                    <md-option :value="1">אין דיבור</md-option>
                    <md-option :value="2">השמעת קולות</md-option>
                    <md-option :value="3">מילים ללא הקשר</md-option>
                    <md-option :value="4">בילבול, חוסר התמצאות</md-option>
                    <md-option :value="5">מתמצא ומדבר לעניין</md-option>
                </md-select>
            </md-field>
            <md-field>
                <label for="motor">תנועה</label>
                <md-select v-model.number="motor" name="motor" id="motor">
                    <md-option :value="1">אין תנועה</md-option>
                    <md-option :value="2">יישור גפיים בכאב</md-option>
                    <md-option :value="3">כיפוף גפיים בכאב</md-option>
                    <md-option :value="4">רתיעה מכאב</md-option>
                    <md-option :value="5">תגובה לפי מיקום הכאב</md-option>
                    <md-option :value="6">ציות לפקודות</md-option>
                </md-select>
            </md-field>
        </template>
        <template #side>
            <info-card :grade="gradeCalc">ציון גלאזגו הוא: {{ glazgoGrade }} ({{ glazgoGradeWords }})</info-card>
            <info-card>
                <p>ציון נמוך מ9 מוגדר כתרדמת חמורה.</p>
                <p>ציון בין 9 ל12 מוגדר כתרדמת בינונית.</p>
                <p>ציון גבוה מ12 מוגדר כתרדמת מינורית.</p>
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
    eyes: number = 1;
    speech: number = 1;
    motor: number = 1;
    get glazgoGrade(): number {
        return this.eyes + this.speech + this.motor;
    }
    get glazgoGradeWords(): string {
        if (this.glazgoGrade > 12) return "תרדמת מינורית";
        if (this.glazgoGrade <= 9 && this.glazgoGrade >= 12) return "תרדמת בינונית";
        return "תרדמת חמורה";
    }
    get gradeCalc(): number {
        if (this.glazgoGrade > 6) return 2;
        if (this.glazgoGrade >= 4 && this.glazgoGrade <= 6) return 1;
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
