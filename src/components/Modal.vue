<template>
    <div class="modal" :class="{'modal-error': error}">
        <h1 class="modal__title"></h1>
        <div class="modal__content"></div>
        <div class="modal__footer"></div>
    </div>
</template>

<script>
export default {
    props: {
        error: Boolean,
        title: String,
        content,
        footer
    }
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 10%;
    left: 0;
    right: 0;
    background-color: $modalBackground;
    max-height: 70%;
    padding: 0;
    width: 55%;
    margin: auto;
    overflow-y: auto;
    border-radius: 2px;
    will-change: top, opacity;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
        0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
    &__title {
        display: block;
        font-size: 2.28rem;
    }
}
</style>
