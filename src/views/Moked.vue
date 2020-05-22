<template>
    <div>
        <md-tabs :md-is-rtl="true" :md-swipeable="true" md-alignment="fixed">
            <md-tab id="tab-forms" md-label="הכתבת טפסים" to="/moked/forms">היי</md-tab>
            <md-tab id="tab-pages" md-label="דיווח צוות" to="/moked/team">ויי</md-tab>
            <md-tab id="tab-posts" md-label="הודעה כללית" to="/moked/general">זיי</md-tab>
        </md-tabs>
        <md-empty-state md-icon="devices_other" md-label="לא קיימים מוקד" md-description="ההמתנה משתלמת."></md-empty-state>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Tools extends Vue {}
</script>