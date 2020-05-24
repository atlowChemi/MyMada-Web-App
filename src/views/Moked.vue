<template>
    <div class="holder">
        <md-tabs md-sync-route :md-is-rtl="true" :md-swipeable="true" md-alignment="fixed">
            <md-tab id="tab-forms" md-label="הכתבת טפסים" to="/moked/forms">
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
                    <p>היי</p>
            </md-tab>
            <md-tab id="tab-pages" md-label="דיווח צוות" to="/moked/team">ויי</md-tab>
            <md-tab id="tab-posts" md-label="הודעה כללית" to="/moked/general"><general @message-sent="sendModal" /></md-tab>
        </md-tabs>
        <!-- <md-empty-state md-icon="devices_other" md-label="לא קיימים מוקד" md-description="ההמתנה משתלמת."></md-empty-state> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import General from "@/components/MokedPage/General.vue";

@Component({
    components: {
        General
    }
})
export default class Tools extends Vue {
    sendModal(message: string) {
        this.$store.dispatch("alert/sendToMoked", { message })
    }
}
</script>   

<style lang="scss">
.holder {
    height: 100%;
    .md-tabs {
        $tabs: &;
        height: 100%;
        &-content {
            height: 100% !important;
            .md-tabs-container {
                height: 100%;
                .md-tab {
                    max-height: 100%;
                    overflow-y: auto;
                }
            }
        }
    }
}
</style>