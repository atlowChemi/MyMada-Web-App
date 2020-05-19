<template>
    <router-link class="btn" :class="{classs}" v-waves:hover v-if="link" :to="to">
        <slot />
    </router-link>
    <button class="btn" v-waves:hover v-else @click="clicked($event)">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        link: {
            required: false,
            type: Boolean,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: ""
        },
        classs: String
    },
    methods: {
        clicked(e) {
            this.$emit("click", e);
        }
    }
};
</script>

<style lang="scss" scoped>
.btn {
    text-decoration: none;
    font: inherit;
    text-align: center;
    letter-spacing: 0.5px;
    border: none;
    border-radius: 2px;
    height: 2.25rem;
    color: white;
    background-color: $btnColor;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s ease-out;
    padding: 0 1rem;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    &:hover,
    &:active,
    &:focus {
        background-color: $btnHoverColor;
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14),
            0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
    }
    &.flat {
        background: transparent;
        color: black;
        &:hover,
        &:active,
        &:focus {
            background: transparent;
            box-shadow: none;
        }
    }
    &.danger {
        background-color: $primaryError;
        color: white;
        &:hover,
        &:active,
        &:focus {
            background-color: $secondaryError;
        }
    }
    &:disabled,
    &[disabled],
    &.disabled {
        color: $btnDisabledColor!important;
        background-color: $btnDisabledBackground!important;
    }
}
</style>

<style lang="scss">
.btn {
    &.waves-effect {
        position: relative;
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        .waves-ripple {
            position: absolute;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            opacity: 0;
            background: rgba(0, 0, 0, 0.2);
            background: radial-gradient(
                rgba(0, 0, 0, 0.2) 0,
                rgba(0, 0, 0, 0.3) 40%,
                rgba(0, 0, 0, 0.4) 50%,
                rgba(0, 0, 0, 0.5) 60%,
                hsla(0, 0%, 100%, 0) 70%
            );
            transition: all 0.5s ease-out;
            transition-property: transform, opacity;
            transform: scale(0) translate(0);
            pointer-events: none;
        }

        &.waves-success {
            .waves-ripple {
                background: rgba(0, 182, 61, 0.4);
                background: radial-gradient(
                    rgba(0, 182, 61, 0.2) 0,
                    rgba(0, 182, 61, 0.3) 40%,
                    rgba(0, 182, 61, 0.4) 50%,
                    rgba(0, 182, 61, 0.5) 60%,
                    rgba(0, 182, 61, 0) 70%
                );
            }
        }

        &.waves-danger {
            .waves-ripple {
                background: rgba(255, 0, 0, 0.4);
                background: radial-gradient(
                    rgba(255, 0, 0, 0.2) 0,
                    rgba(255, 0, 0, 0.3) 40%,
                    rgba(255, 0, 0, 0.4) 50%,
                    rgba(255, 0, 0, 0.5) 60%,
                    rgba(255, 0, 0, 0) 70%
                );
            }
        }

        &.waves-light {
            .waves-ripple {
                background: rgba(255, 255, 255, 0.4);
                background: radial-gradient(
                    hsla(0, 0%, 100%, 0.2) 0,
                    hsla(0, 0%, 100%, 0.3) 40%,
                    hsla(0, 0%, 100%, 0.4) 50%,
                    hsla(0, 0%, 100%, 0.5) 60%,
                    hsla(0, 0%, 100%, 0) 70%
                );
            }
        }
    }
}
</style>
