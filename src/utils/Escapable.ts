import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class Escapable extends Vue {
    created() {
        const escapeHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                this.escaped();
            }
        };

        document.addEventListener("keydown", escapeHandler);

        this.$once("hook:destroyed", () => {
            document.removeEventListener("keydown", escapeHandler);
        });
    }
    @Emit()
    escaped() {
        return true;
    }
}
