<template>
    <div class="tools">
        <md-empty-state v-if="!currentTool" md-icon="build" md-label="יש לבחור כלי" md-description="אנא בחר כלי מתפריט הצד."></md-empty-state>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Tools extends Vue{
    get currentTool(): string | undefined {
        return this.$route.params.tool;
    }
};
</script>

<style lang="scss" scoped>
.tools {
    @include desktop {
        margin-right: 19rem;
    }
}
</style>
