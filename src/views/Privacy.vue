<template>
    <div class="container">
        <h1 v-t="'privacy-page.page-title'"></h1>
        <p>
            <b>{{ $t("privacy-page.up-to-date") }}: 01/06/2020.</b>
        </p>
        <p v-html="$t('privacy-page.intro')"></p>
        <div>
            <h2 v-t="'privacy-page.private-info.title'"></h2>
            {{ $t("privacy-page.private-info.info") }}
            <br />
            <b v-t="'privacy-page.private-info.types.title'"></b>
            <br />
            <i><b v-t="'privacy-page.private-info.types.private-info.title'"></b></i>
            <br />
            <span v-t="'privacy-page.private-info.types.private-info.info'"></span>
            <ul>
                <li v-for="(item, index) in $t('privacy-page.private-info.types.private-info.types')" :key="index">{{ item }}</li>
            </ul>
            <i><b v-t="'privacy-page.private-info.types.usage-data.title'"></b></i>
            <br />{{ $t("privacy-page.private-info.types.usage-data.info") }}
        </div>
        <div>
            <h2 v-t="'privacy-page.data-usage.title'"></h2>
            <span v-t="'privacy-page.data-usage.info'"></span>
            <ul>
                <li v-for="(item, index) in $t('privacy-page.data-usage.types')" :key="index">{{ item }}</li>
            </ul>
        </div>
        <div>
            <h2 v-t="'privacy-page.data-handing.title'">העברת המידע</h2>
            <span v-html="$t('privacy-page.data-handing.info')"></span>
        </div>
        <div>
            <h2 v-t="'privacy-page.data-exposure.title'"></h2>
            <b v-t="'privacy-page.data-exposure.law.title'"></b>
            <br />
            <br />
            <span v-t="'privacy-page.data-exposure.law.info'"></span>
            <br />
            <ul>
                <li v-for="(item, index) in $t('privacy-page.data-exposure.law.types')" :key="index">{{ item }}</li>
            </ul>
        </div>
        <div>
            <h2 v-t="'privacy-page.data-security.title'"></h2>
            <span v-html="$t('privacy-page.data-security.info')"></span>
        </div>
        <div>
            <h2 v-t="'privacy-page.services.title'"></h2>
            <span v-html="$t('privacy-page.services.info')"></span>
            <br />
            <br />
            <b v-t="'privacy-page.services.analytics.title'"></b>
            <br />
            <br />
            <span v-t="'privacy-page.services.analytics.info'"></span>
            <br />
            <br />
            <ul>
                <li>
                    <i><b v-t="'privacy-page.services.analytics.google.title'"></b></i>
                    <br />
                    <p v-html="$t('privacy-page.services.analytics.google.info')"></p>
                </li>
            </ul>
        </div>
        <div>
            <h2 v-t="'privacy-page.outer-links.title'"></h2>
            <span v-html="$t('privacy-page.outer-links.info')"></span>
        </div>
        <div>
            <h2 v-t="'privacy-page.children.title'"></h2>
            <span v-html="$t('privacy-page.children.info')"></span>
        </div>
        <div>
            <h2 v-t="'privacy-page.updates.title'"></h2>
            <span v-html="$t('privacy-page.updates.info')"></span>
        </div>
        <div>
            <h2 v-t="'privacy-page.contact.title'"></h2>
            <span v-t="'privacy-page.contact.info'"></span>
            <ul>
                <li>
                    <router-link to="/contact"><span v-t="'privacy-page.contact.web'"></span></router-link>
                </li>
                <li><span v-t="'privacy-page.contact.email'"></span> <a href="mailto:atlowapps@gmail.com">atlowapps@gmail.com</a></li>
                <li><span v-t="'privacy-page.contact.whatsapp'"></span> <a href="https://wa.me/972557123581" target="_blank">055-712-3581</a></li>
            </ul>
            <br />
            <br />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Privacy extends Vue {}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 1.64rem;
    font-weight: 200;
}
h2 {
    font-size: 1.2rem;
    font-weight: bold;
}
</style>
