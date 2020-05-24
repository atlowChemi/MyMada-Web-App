<template>
    <div class="grid-container">
        <home-button of="tools">כלי עזר למתנדב</home-button>
        <home-button of="moked/team">דיווחים למוקד</home-button>
        <home-button of="contact">צור קשר</home-button>
        <home-button of="info">אודות האפליקציה</home-button>
        <home-button of="play">הורדה בגוגל פליי</home-button>
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
