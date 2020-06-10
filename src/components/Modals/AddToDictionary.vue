<template>
    <div>
        <md-field md-clearable :class="nameHasErrors">
            <md-icon>title</md-icon>
            <label>{{ $t("modals.add-to-dictionary.item-name") }}</label>
            <md-input v-model="name"></md-input>
            <span class="md-error">{{ $t("modals.add-to-dictionary.item-name-err") }}</span>
        </md-field>
        <md-field md-clearable :class="descriptionHasErrors">
            <md-icon>description</md-icon>
            <label>{{ $t("modals.add-to-dictionary.item-details") }}</label>
            <md-textarea v-model="def" md-autogrow></md-textarea>
            <span class="md-error">{{ $t("modals.add-to-dictionary.item-details-err") }}</span>
        </md-field>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class AddToDictionary extends Vue {
    tempItem: DictionaryItem = { name: "", key: "", definition: "" };
    checkName = false;
    checkDef = false;
    get name() {
        return this.tempItem.name;
    }
    set name(name) {
        this.tempItem.name = name.trim();
        this.checkName = true;
        this.isValid();
    }
    get def() {
        return this.tempItem.definition;
    }
    set def(def) {
        this.tempItem.definition = def.trim();
        this.checkDef = true;
        this.isValid();
    }
    get nameHasErrors(): string | null {
        return this.checkName && this.name!?.length <= 0 ? "md-invalid" : null;
    }
    get descriptionHasErrors(): string | null {
        return this.checkDef && this.def!?.length <= 0 ? "md-invalid" : null;
    }
    @Emit()
    isValid() {
        if (this.tempItem.name && this.tempItem.definition) return this.tempItem;
        return null;
    }
}
</script>
