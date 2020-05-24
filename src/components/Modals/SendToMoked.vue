<template>
    <div>
        <p class="mokedTo">הודעה זו תשלח למוקד: {{ mokdim[moked] }}</p>
        <p class="message">{{ msg }}</p>
        <p class="counter">{{chars}} תווים בהודעה. {{msgs}} הודעות.</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SendToMoked extends Vue {
    @Prop({type: String, required: true}) readonly msg!: string;
    readonly mokdim = ["ירושלים", "איילון", "אשר", "גלבוע", "דן", "ירדן", "ירקון", "כרמל", "לכיש", "נגב", "שרון", "מוקד 4"];
    get moked(): number {
        return this.$store.state.settings.moked;
    }
    
    get chars(): number {
        return this.msg.length;
    }
    get msgs(): number {
        return Math.floor(1+(this.msg.length-1)/70);
    }
    
}
</script>

<style lang="scss" scoped>
.mokedTo {
    color: $btnColor;
}
.message {
    white-space: pre;
}
.counter {
    color: $backdropBackground;
}
</style>
