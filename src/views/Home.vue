<template>
    <div class="grid-container">
        <home-button of="tools">{{ $t("home-buttons.tools") }}</home-button>
        <home-button of="moked/team">{{ $t("home-buttons.moked") }}</home-button>
        <home-button of="contact">{{ $t("home-buttons.contact") }}</home-button>
        <home-button of="info">{{ $t("home-buttons.info") }}</home-button>
        <home-button of="play">{{ $t("home-buttons.play") }}</home-button>
    </div>
</template>

<script>
import HomeButton from "@/components/HomeButton.vue";

export default {
    name: "Home",
    components: {
        HomeButton,
    },
};
</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.6rem 0.7rem;
    align-content: center;
    margin: 0.5rem auto;
    width: 90%;
    max-width: 45rem;
    .home-btn:first-of-type {
        grid-column: 1 / span 2;
    }
}
</style>
