<template>
    <div class="protocoles">
        <iframe :src="url" frameborder="0" :key="tool"></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Protocoles extends Vue {
    readonly files: { [key: string]: string } = {
        als: "https://firebasestorage.googleapis.com/v0/b/project-3918384647339420127.appspot.com/o/als%5B1%5D.pdf?alt=media&token=49d9e5f1-03d5-49d5-a951-b58dce094ca6",
        bls: "https://firebasestorage.googleapis.com/v0/b/project-3918384647339420127.appspot.com/o/bls%5B1%5D.pdf?alt=media&token=7da40564-fe83-4254-a929-f8b2ec67ca41",
        dead: "https://firebasestorage.googleapis.com/v0/b/project-3918384647339420127.appspot.com/o/kuntres.pdf?alt=media&token=2b7c5ce5-e5e5-4fae-9b27-fb2ba4d7e826",
    };
    readonly baseUrl = "https://docs.google.com/viewer?embedded=true&url=";
    tool: string = "";
    mounted() {
        this.tool = this.$route.params.tool;
    }
    get url() {
        return `${this.baseUrl}${this.files[this.tool]}`;
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
