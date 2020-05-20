<template>
    <md-field md-clearable :class="hasErrors">
        <label>שם</label>
        <md-input v-model="nameTemp"></md-input>
        <span class="md-error">לא רשמת שם!</span>
    </md-field>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ChangeName extends Vue {
    get nameTemp(): string{
        return this.$store.state.user.name;
    }
    set nameTemp(name: string) {
        this.$store.dispatch("user/changeName", {name});
    }
    get hasErrors(): string | null {
        return this.nameTemp.length <= 0 ? "md-invalid" : null;
    }
}
</script>