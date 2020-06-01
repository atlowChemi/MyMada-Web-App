<template>
    <div class="protocoles" ref="viewer"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WebViewer from "@pdftron/webviewer";

@Component
export default class Protocoles extends Vue {
    url: string = `${process.env.BASE_URL}protocoles/als.pdf`;
    mounted() {
        WebViewer(
            {
                path: `${process.env.BASE_URL}lib`,
                initialDoc: this.url,
            },
            this.$refs.viewer as HTMLElement
        ).then(instance => {
            instance.setTheme("dark");
        });
    }
}
</script>

<style lang="scss" scoped>
.protocoles {
    height: 100%;
    width: 100%;
    /deep/ iframe {
        height: 100%;
    }
}
</style>
