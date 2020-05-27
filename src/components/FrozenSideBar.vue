<template>
    <fragment>
        <div class="content">
            <slot />
        </div>
        <div class="side-frozen" @click="GreyMaterClicked">
            <slot name="side" />
        </div>
    </fragment>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { Fragment } from "vue-fragment";

@Component({
    components: {
        Fragment,
    },
})
export default class Contractions extends Vue {
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
    // position: absolute;
    // bottom: 0;
    // right: 0;
    // left: 0;
    padding: 10px 0;
    justify-content: center;
    align-items: center;
    background: #5f6072;
    @include tablet {
        margin-right: auto;
        padding: 0;
        position: unset !important;
        width: 33.3333333333%;
    }
}
</style>
