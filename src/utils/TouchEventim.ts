import i18n from "@/i18n";

const touchData = {
    longTouch: false,
    movex: 0,
    slideWidth: 304,
    touchmovex: 0,
    touchstartx: 0,
    direction: 0,
};

const start = (event: TouchEvent) => {
    // Test for flick.
    touchData.longTouch = false;
    setTimeout(() => (touchData.longTouch = true), 250);
    // Get the original touch position.
    touchData.touchstartx = event.touches[0].screenX;
    touchData.direction = touchData.movex = touchData.touchmovex = 0;
};

const getPercentage = (event: TouchEvent) => {
    let percentage = Math.abs((touchData.touchstartx - touchData.touchmovex) / touchData.slideWidth) * 100;
    percentage = Math.max(Math.min(percentage, 100), 0);

    if (touchData.direction === 1) {
        return 100 - percentage;
    }
    return percentage;
};

const reverseLtr = (num: number) => num * (i18n.locale === "en" ? -1 : 1);

const move = (event: TouchEvent) => {
    // Continuously return touch position.
    touchData.touchmovex = event.touches[0].screenX;
    touchData.direction = touchData.direction || reverseLtr(Math.sign(touchData.touchstartx - touchData.touchmovex));
    touchData.movex = reverseLtr(getPercentage(event));
    eDispatcher(touchData.movex);
};
const end = (event: TouchEvent) => {
    // Move and animate the elements.
    const total = Math.abs(touchData.touchstartx - touchData.touchmovex);
    if (total > 30 && touchData.direction === 1) {
        eDispatcher(0);
    } else {
        eDispatcher(reverseLtr(100));
    }
};

const eDispatcher = (amount: number) => {
    document.dispatchEvent(
        new CustomEvent<DragEventDetails>("drawertouched", { detail: { x: amount } })
    );
};

const touchDragger: { init: () => void; dispose: () => void } = {
    init() {
        document.addEventListener("touchstart", start);
        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", end);
    },
    dispose() {
        document.removeEventListener("touchstart", start);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", end);
    },
};

export { touchDragger };

(<any>window).touchData = touchData;