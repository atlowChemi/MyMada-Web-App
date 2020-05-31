<template>
    <fragment>
        <div class="content">
            <slot />
        </div>
        <div class="side-frozen" :class="{ light }" @click="GreyMaterClicked">
            <slot name="side" />
        </div>
    </fragment>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import { Fragment } from "vue-fragment";

@Component({
    components: {
        Fragment,
    },
})
export default class FrozenSideBar extends Vue {
    @Prop({ type: Boolean, required: false, default: false }) light!: boolean;
    @Emit()
    GreyMaterClicked(e: UIEvent) {
        return e;
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 0 0.75rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    @include tablet {
        width: 66.6666666667%;
    }
}
.side-frozen {
    display: flex;
    padding: 0.7rem 0;
    align-items: center;
    flex-flow: column;
    @include tablet {
        margin-right: auto;
        padding: 0;
        position: unset !important;
        width: 33.3333333333%;
    }
    &:not(.light) {
        justify-content: center;
        background: #5f6072;
    }
    &.light {
        padding: 0.7rem 1.4rem;
    }
}
</style>
