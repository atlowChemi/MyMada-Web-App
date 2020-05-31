<template>
    <div class="message" :class="{ admin: msg.sender === 'admin', whatsapp: msg.WhatsApp }" @click="whatsappClick">
        <span class="message__name">{{ name }}</span>
        <span class="message__time">{{ MillisecondsToHumanDate(msg.time) }}</span>
        <span class="message__content">
            <span v-if="msg.WhatsApp" class="message__whatsapp icon-whatsapp"></span>
            {{ msg.msg }}
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ContactMessage extends Vue {
    @Prop({ required: true }) readonly msg!: { msg: string; sender: string; time: number; WhatsApp?: boolean };
    @Prop({ type: String, required: true }) readonly name!: string;
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
    whatsappClick() {
        if (this.msg.WhatsApp) {
            let message = "שלום, אני " + name + " ואני פונה לגבי השיחה שלנו באתר.";
            window.open("https://wa.me/972557249771?text=" + encodeURIComponent(message));
        }
    }
}
</script>

<style lang="scss" scoped>
.message {
    $msg: &;
    display: block;
    margin: 1rem auto;
    padding: 0.4rem 1rem;
    border-radius: 8px;
    background-color: white;
    &.admin {
        background-color: $primaryColor;
        color: white;
        &.whatsapp {
            text-align: center;
            cursor: pointer;
        }
    }
    &__name {
        float: right;
        font-size: 1.2rem;
        font-weight: bold;
    }
    &__time {
        float: left;
    }
    &__content {
        #{ $msg }__whatsapp {
            display: block;
            padding-bottom: 0.5rem;
        }
        display: block;
        margin-top: 1.6rem;
        font-size: 1rem;
    }
}
</style>
