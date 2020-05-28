<template>
    <div class="tools">
        <md-empty-state v-if="!currentTool" md-icon="build" md-label="יש לבחור כלי" md-description="אנא בחר כלי מתפריט הצד."></md-empty-state>
        <contractions v-else-if="currentTool === 'contractions'"></contractions>
        <pulse v-else-if="currentTool === 'pulse'"></pulse>
        <metronome v-else-if="currentTool === 'metronome'"></metronome>
        <vital v-else-if="currentTool === 'vital'"></vital>
        <oxygen v-else-if="currentTool === 'oxygen'"></oxygen>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ToolsPageComponents } from "../components";

@Component({
    components: {
        Contractions: ToolsPageComponents.Contractions,
        Pulse: ToolsPageComponents.Pulse,
        Metronome: ToolsPageComponents.Metronome,
        Vital: ToolsPageComponents.Vital,
        Oxygen: ToolsPageComponents.Oxygen,
    },
})
export default class Tools extends Vue {
    get currentTool(): string | undefined {
        return this.$route.params.tool;
    }
}
</script>

<style lang="scss" scoped>
.tools {
    height: 100%;
    display: flex;
    flex-flow: column;
    @include tablet {
        flex-flow: row;
    }
    @include desktop {
        margin-right: 19rem;
    }
}
</style>
