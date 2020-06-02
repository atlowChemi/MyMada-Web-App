<template>
    <div class="dictionary">
        <md-autocomplete md-open-on-focus v-model="searchText" :md-options="nameItems">
            <label><md-icon class="searcher">search</md-icon>{{ $t("tools-page.dictionary.search") }}</label>
            <template #md-autocomplete-item="{ item, term }">
                <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
            </template>
            <template #md-autocomplete-empty="{ term }">{{ $t("tools-page.dictionary.not-found") }}: "{{ term }}"</template>
        </md-autocomplete>
        <md-list :md-expand-single="true">
            <md-list-item md-expand v-for="item in filteredItems" :key="item.key">
                <md-icon>topic</md-icon>
                <span class="md-list-item-text">{{ item.name }}</span>
                <p slot="md-expand" class="definition">{{ item.definition }}</p>
            </md-list-item>
        </md-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FB } from "@/utils/firebaseConfig";

@Component
export default class Dictionary extends Vue {
    searchText: string = "";
    nameItems: string[] = [];
    items: DictionaryItem[] = [];
    created() {
        FB.collection("dictionary")
            .where("approved", "==", true)
            .orderBy("name")
            .onSnapshot({ includeMetadataChanges: true }, snapshot => {
                let words: DictionaryItem[] = [];
                snapshot.forEach(doc => {
                    const { name, definition, key } = doc.data();
                    words.push({ name, definition, key });
                });
                this.nameItems = words.map(mc => mc.name);
                this.items = words;
            });
    }
    get filteredItems() {
        return this.items.filter(item => {
            return item.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
    }
}
</script>

<style lang="scss" scoped>
.dictionary {
    padding: 0 2rem;
    width: 100%;
    overflow-y: auto;
    .searcher {
        transition: inherit;
        color: inherit;
    }
    .md-list {
        &-item {
            &-expand {
                width: auto;
                display: block;
                background-color: white;
                @include transition(margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94));
                &.md-active {
                    margin: 0.5rem;
                    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
                    /deep/ .md-list-item-content {
                        border-bottom: 1px solid $background;
                        font-weight: bold;
                    }
                }
                .definition {
                    white-space: pre-wrap;
                    padding: 0.5rem 1rem;
                    margin: 0;
                }
            }
        }
    }
}
</style>
