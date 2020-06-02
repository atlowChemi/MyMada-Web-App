<template>
    <div class="holder">
        <md-tabs md-sync-route :md-is-rtl="true" :md-swipeable="true" md-alignment="fixed">
            <md-tab id="tab-forms" :md-label="$t('moked-page.forms.name')" to="/moked/forms">
                <forms @message-sent="sendModal" />
            </md-tab>
            <md-tab id="tab-pages" :md-label="$t('moked-page.team.name')" to="/moked/team"><team @message-sent="sendModal"/></md-tab>
            <md-tab id="tab-posts" :md-label="$t('moked-page.general.name')" to="/moked/general"><general @message-sent="sendModal"/></md-tab>
        </md-tabs>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { MokedPageComponents } from "@/components";

const Forms = MokedPageComponents.Forms;
const General = MokedPageComponents.General;
const Team = MokedPageComponents.Team;

@Component({
    components: {
        Forms,
        General,
        Team,
    },
})
export default class Tools extends Vue {
    sendModal(message: string) {
        this.$store.dispatch("alert/sendToMoked", { message });
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
