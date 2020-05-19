<template>
    <header class="main-header">
        <nav class="main-header__nav">
            <div class="main-header__nav-wrapper">
                <a
                    class="main-header__nav-wrapper__button main-header__nav-wrapper__button-right"
                    v-if="currentLoc === 'Tools'"
                >
                    <i class="material-icons">menu</i>
                </a>
                <a
                    class="main-header__nav-wrapper__button main-header__nav-wrapper__button-right"
                    v-else-if="currentLoc !== 'home'"
                    @click="goBack"
                >
                    <i class="material-icons">arrow_forward</i>
                </a>
                <span class="main-header__nav-wrapper__brand" v-if="title">{{
                    title
                }}</span>
                <span
class="main-header__nav-wrapper__brand" v-else
                    >דיווחי מד"א</span
                >
                <a
                    class="main-header__nav-wrapper__button main main-header__nav-wrapper__button-left"
                    @click="openSettings"
                >
                    <i class="material-icons">settings</i>
                </a>
            </div>
            <div
                class="main-header__nav--circle"
                v-if="currentLoc === 'home'"
            ></div>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        currentLoc() {
            return this.$route.name;
        },
        title() {
            return this.$route.meta.title;
        }
    },
    methods: {
        openSettings() {
            this.$store.dispatch("alert/settings");
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
.main-header {
    $mainHeader: &;
    width: 100%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    &__nav {
        text-align: center;
        height: 3.5rem;
        width: 100%;
        background-color: $primaryColor;
        &-wrapper {
            position: relative;
            height: 99%;
            font-size: 2.1rem;
            .material-icons {
                font-size: 1.8rem;
                vertical-align: middle;
                color: white;
            }
            &__button {
                position: absolute;
                font: inherit;
                vertical-align: middle;
                cursor: pointer;
                &-left {
                    left: 0.8rem;
                }
                &-right {
                    right: 0.8rem;
                }
            }
            &__brand {
                font: inherit;
                vertical-align: middle;
                line-height: 3.5rem;
                color: white;
            }
        }
        &--circle {
            background: linear-gradient($primaryColor, $secondaryColor);
            height: 10rem;
            border-bottom-left-radius: 100% 200%;
            border-bottom-right-radius: 100% 200%;
        }
    }
}
</style>
