<template>
    <div class="grid-container">
        <HomeButton of="tools">כלי עזר למתנדב</HomeButton>
        <HomeButton of="moked">דיווחים למוקד</HomeButton>
        <HomeButton of="contact">צור קשר</HomeButton>
        <HomeButton of="info">אודות האפליקציה</HomeButton>
        <HomeButton of="play">הורדה בגוגל פליי</HomeButton>
    </div>
</template>

<script>
import HomeButton from "@/components/HomeButton.vue";

export default {
    name: "Home",
    components: {
        HomeButton
    }
};
</script>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-gap: 0.6rem 0.7rem;
    grid-template-columns: 50% 50%;
    align-content: center;
    margin: 0 auto;
    width: 90%;
    max-width: 45rem;
    .home-btn:first-of-type {
        grid-column: 1 / span 2;
    }
}
</style>
