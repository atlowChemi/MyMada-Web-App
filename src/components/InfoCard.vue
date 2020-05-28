<template>
    <div class="info-card">
        <div class="info-card__icon">
            <i class="material-icons">info</i>
        </div>
        <div class="info-card__text"><slot>לא נכתבה פה הודעה!</slot></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InfoCard extends Vue {}
</script>

<style lang="scss" scoped>
.info-card {
    display: flex;
    flex-flow: row;
    background: white;
    width: 100%;
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 2rem;
    &__text {
        margin-right: 0.8rem;
        padding-right: 0.4rem;
        border-right: 1px solid $btnDisabledColor;
        font-size: 1rem;
        p {
            margin: 0;
        }
    }
}
</style>
