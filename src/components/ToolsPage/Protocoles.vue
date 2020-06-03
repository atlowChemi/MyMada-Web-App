<template>
    <div class="protocoles">
        <iframe :src="url" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Protocoles extends Vue {
    base: string = `${process.env.BASE_URL}protocoles/`;
    viewer: string = `${this.base}web/viewer.html?file=../`;
    tool: string = "";
    mounted() {
        this.tool = this.$route.params.tool;
    }
    get url() {
        return `${this.viewer}${this.tool}.pdf#locale=${this.$i18n.locale === "he" ? "he" : "en-US"}`;
    }
    @Watch("$route.params.tool")
    WhichTool() {
        this.tool = this.$route.params.tool;
    }
}
</script>

<style lang="scss" scoped>
.protocoles {
    height: 100%;
    width: 100%;
    iframe {
        height: 100%;
        width: 100%;
    }
}
</style>
