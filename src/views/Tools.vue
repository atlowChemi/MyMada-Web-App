<template>
    <div>
        <md-empty-state md-icon="devices_other" md-label="לא קיימים כלים" md-description="ההמתנה משתלמת."></md-empty-state>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Tools extends Vue{};
</script>