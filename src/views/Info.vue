<template>
    <div class="container">
        <p>{{ $t("info-page.version") }} {{ $store.getters.appVersion }}</p>
        <p v-html="$t('info-page.section[0]')"></p>
        <p v-html="$t('info-page.section[1]')"></p>
        <p v-html="$t('info-page.section[2]')"></p>
        <p v-html="$t('info-page.section[3]')"></p>
        <HomeButton isSmall of="privacy">{{ $t("home-buttons.privacy") }}</HomeButton>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeButton from "@/components/HomeButton.vue";

@Component({
    components: {
        HomeButton,
    },
})
export default class Info extends Vue {}
</script>
