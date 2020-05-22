<template>
    <div class="message" :class="{ admin: msg.sender === 'admin' }" :key="msg.time">
        <span class="message__name">{{ name }}</span>
        <span class="message__time">{{ MillisecondsToHumanDate(msg.time) }}</span>
        <span class="message__content">{{ msg.msg }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ContactMessage extends Vue {
    @Prop({ required: true }) readonly msg!: { msg: string; sender: string; time: number };
    @Prop({type: String, required: true}) readonly name!: string;
    MillisecondsToHumanDate(time: number): string {
        let dt = new Date(time);
        let hours, minutes, seconds, day, month, year;
        hours = (hours = dt.getHours()) < 10 ? "0" + hours : hours;
        minutes = (minutes = dt.getMinutes()) < 10 ? "0" + minutes : minutes;
        seconds = (seconds = dt.getSeconds()) < 10 ? "0" + seconds : seconds;
        day = (day = dt.getDate()) < 10 ? "0" + day : day;
        month = (month = dt.getMonth()) < 10 ? "0" + month : month;
        year = dt.getFullYear();
        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    }
}
</script>

<style lang="scss" scoped>
.message {
    margin: 1rem auto;
    padding: 0.4rem 1rem;
    border-radius: 8px;
    background-color: white;
    &.admin {
        background-color: $primaryColor;
        color: white;
    }
    &__name {
        font-size: 1.2rem;
        font-weight: bold;
    }
    &__time {
        float: left;
    }
    &__content {
        display: block;
        margin-top: 0.6rem;
        font-size: 1rem;
    }
}
</style>