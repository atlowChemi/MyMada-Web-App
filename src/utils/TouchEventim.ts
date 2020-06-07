import i18n from "@/i18n";

const touchData: { touchstartx: number; touchmovex: number; movex: number; longTouch: boolean; slideWidth: 304 } = {
    longTouch: false,
    movex: 0,
    slideWidth: 304,
    touchmovex: 0,
    touchstartx: 0,
};

const start = (event: TouchEvent) => {
    // Test for flick.
    touchData.longTouch = false;
    setTimeout(() => (touchData.longTouch = true), 250);
    // Get the original touch position.
    touchData.touchstartx = event.touches[0].screenX;
    touchData.movex = touchData.touchmovex = 0;
};
const move = (event: TouchEvent) => {
    // Continuously return touch position.
    touchData.touchmovex = event.touches[0].screenX;
    // Calculate distance to translate holder.
    let movementPercentage = ((touchData.touchstartx - touchData.touchmovex) / touchData.slideWidth) * 100;
    if (i18n.locale === "en") movementPercentage = movementPercentage * -1;
    if (touchData.movex >= 0) touchData.movex = Math.min(movementPercentage, 100);
    //else touchData.movex = Math.max(touchData.movex, -100);
    // Defines the speed the images should move at.
    if (touchData.movex < touchData.slideWidth) {
        // makes the holder stop moving when there is no more content.
        eDispatcher();
    }
};
const end = () => {
    // Move and animate the elements.
    // touchData.touchstartx = 0;
    let abs = Math.abs(touchData.movex);
    if (abs > 30) eDispatcher(100);
    else if (abs <= 30) eDispatcher(0);
};

const eDispatcher = (amount?: number) => {
    if (amount !== undefined) touchData.movex = amount;
    document.dispatchEvent(
        new CustomEvent<DragEventDetails>("drawertouched", { detail: { x: touchData.movex } })
    );
};

const touchDragger: { init: () => void; unInit: () => void } = {
    init() {
        document.addEventListener("touchstart", start);
        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", end);
    },
    unInit() {
        document.removeEventListener("touchstart", start);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", end);
    },
};

export { touchDragger };

(<any>window).touchData = touchData;