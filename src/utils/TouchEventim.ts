import i18n from "@/i18n";
import { convertRemToPixels } from "./helperMethods";

const touchData = {
    diffXAxis: 0,
    slideWidth: convertRemToPixels(19),
    newXLocation: 0,
    startXLocation: 0,
    startYLocation: 0,
    direction: 0,
};

const start = (event: TouchEvent) => {
    // Get the original touch position.
    touchData.startXLocation = event.touches[0].pageX;
    touchData.startYLocation = event.touches[0].pageY;
    touchData.direction = touchData.diffXAxis = touchData.newXLocation = 0;
};

const move = (event: TouchEvent) => {
    //Block x movement if the movemvnt is on X axis
    let movmentY = event.touches[0].pageY;
    if (Math.abs(touchData.startYLocation - movmentY) > 10) return;
    //Do the X movement
    touchData.newXLocation = event.touches[0].pageX;
    touchData.direction = touchData.direction || reverseLtr(Math.sign(touchData.startXLocation - touchData.newXLocation));
    touchData.diffXAxis = reverseLtr(getPercentage());
    eDispatcher(touchData.diffXAxis);
};
const end = () => {
    // Move and animate the elements.
    const total = Math.abs(touchData.startXLocation - touchData.newXLocation);
    if (total > 30 && touchData.direction === 1) eDispatcher(0);
    else eDispatcher(reverseLtr(100));
};

const eDispatcher = (amount: number) => {
    if (amount !== undefined) touchData.diffXAxis = amount;
    document.dispatchEvent(
        new CustomEvent<DragEventDetails>("drawertouched", { detail: { x: amount } })
    );
};

const getPercentage = () => {
    let percentage = Math.abs((touchData.startXLocation - touchData.newXLocation) / touchData.slideWidth) * 100;
    percentage = Math.max(Math.min(percentage, 100), 0);

    if (touchData.direction === 1) {
        return 100 - percentage;
    }
    return percentage;
};

const reverseLtr = (num: number) => num * (i18n.locale === "en" ? -1 : 1);

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
