<template>
    <div>ZZZ</div>
</template>

<script>
const warningMsg = `אנו גוף עצמאי שאינו בקשר עם מד"א. לכן
                <b>אין</b> לשלוח לנו פניות למקרים דחופים הדורשים מענה רפואי.
                <br />כמו כן, איננו קשורים לאפליקציית הצוותים. אין ביכולתנו
                לסייע בה, או לטפל בתקלות בשליחת וקבלת מקרים. <br />עיזרו לנו,
                ואל תיפנו בנושאים שאינם תחום אחריותנו, בכדי שנוכל לתת לכם את
                המענה המיטבי!`;
export default {
    mounted() {
        this.$store.dispatch("alert/error", {
            message: warningMsg,
            title: "הודעה חשובה"
        });
    }
};
</script>
