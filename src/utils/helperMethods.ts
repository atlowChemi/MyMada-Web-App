import { MedicalCodeGroup } from "@/utils/types";

/**
 * Returns the Rem value of given pixels
 * @param rem size in REM, to get returned in px.
 */
export const convertRemToPixels = (rem: number): number => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export function getBrowserLocale() {
    const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
    if (!navigatorLocale) return undefined;
    const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0];
    return trimmedLocale;
}

export const MedicalCodes: MedicalCode[] = [
    //#region Area
    { name: "מצבי חירום סביבתיים", group: MedicalCodeGroup.Area },
    { name: "גוף זר באוזניים", code: 2000, group: MedicalCodeGroup.Area },
    { name: "גוף זר באף", code: 2001, group: MedicalCodeGroup.Area },
    { name: "גוף זר בעיניים", code: 2002, group: MedicalCodeGroup.Area },
    { name: "הכשת נחש", code: 2003, group: MedicalCodeGroup.Area },
    { name: "הרעלות", code: 2004, group: MedicalCodeGroup.Area },
    { name: "התייבשות", code: 2005, group: MedicalCodeGroup.Area },
    { name: "מכת ברק", code: 2006, group: MedicalCodeGroup.Area },
    { name: "עקיצת עקרב", code: 2007, group: MedicalCodeGroup.Area },
    { name: 'פגיעה מבע"ח', code: 2008, group: MedicalCodeGroup.Area },
    { name: "פגיעות חום", code: 2009, group: MedicalCodeGroup.Area },
    { name: "פגיעות קור", code: 2010, group: MedicalCodeGroup.Area },
    { name: "רגישות יתר / אלרגיה", code: 2011, group: MedicalCodeGroup.Area },
    { name: "שאיפת חומרים רעילים", code: 2012, group: MedicalCodeGroup.Area },
    { name: "שאיפת עשן", code: 2013, group: MedicalCodeGroup.Area },
    { name: "תגובה אנאפילקטית", code: 2014, group: MedicalCodeGroup.Area },
    { name: "צריכת יתר אלכוהול", code: 2015, group: MedicalCodeGroup.Area },
    { name: "צריכת יתר סמים", code: 2016, group: MedicalCodeGroup.Area },
    { name: "צריכת יתר תרופות", code: 2017, group: MedicalCodeGroup.Area },
    { name: "תליה", code: 2018, group: MedicalCodeGroup.Area },
    { name: "אחר", code: 2099, group: MedicalCodeGroup.Area },
    //#endregion
    //#region Trauma
    { name: "טראומה", group: MedicalCodeGroup.Trauma },
    { name: "חבלה בגפיים", code: 3000, group: MedicalCodeGroup.Trauma },
    { name: "חבלה בצוואר", code: 3001, group: MedicalCodeGroup.Trauma },
    { name: "חבלה רב מערכתית", code: 3002, group: MedicalCodeGroup.Trauma },
    { name: "חבלת חזה", code: 3003, group: MedicalCodeGroup.Trauma },
    { name: "חבלת ראש", code: 3004, group: MedicalCodeGroup.Trauma },
    { name: "חבלת אגן", code: 3005, group: MedicalCodeGroup.Trauma },
    { name: "חבלת בטן", code: 3006, group: MedicalCodeGroup.Trauma },
    { name: 'חבלת עמ"ש', code: 3007, group: MedicalCodeGroup.Trauma },
    { name: "חבלת פנים", code: 3008, group: MedicalCodeGroup.Trauma },
    { name: "חשד לשבר צוואר ירך", code: 3009, group: MedicalCodeGroup.Trauma },
    { name: "חשד לשבר בגפיים עליונות", code: 3010, group: MedicalCodeGroup.Trauma },
    { name: "חשד לשבר בגפיים תחתונות", code: 3011, group: MedicalCodeGroup.Trauma },
    { name: "כוויה", code: 3012, group: MedicalCodeGroup.Trauma },
    { name: "כוויה דרגה 1", code: 3017, group: MedicalCodeGroup.Trauma },
    { name: "כוויה דרגה 2", code: 3018, group: MedicalCodeGroup.Trauma },
    { name: "כוויה דרגה 3", code: 3019, group: MedicalCodeGroup.Trauma },
    { name: "כוויה כימית", code: 3013, group: MedicalCodeGroup.Trauma },
    { name: "פגיעת מעיכה", code: 3014, group: MedicalCodeGroup.Trauma },
    { name: "קטיעת אצבעות", code: 3015, group: MedicalCodeGroup.Trauma },
    { name: "קטיעת גפיים", code: 3016, group: MedicalCodeGroup.Trauma },
    { name: "אחר", code: 3099, group: MedicalCodeGroup.Trauma },
    //#endregion
    //#region Pain
    { name: "כאבים", group: MedicalCodeGroup.Pain },
    { name: "כאב/לחץ בחזה שאינו ממקור לבבי", code: 4000, group: MedicalCodeGroup.Pain },
    { name: "כאבי אוזניים", code: 4001, group: MedicalCodeGroup.Pain },
    { name: "כאבי בטן", code: 4002, group: MedicalCodeGroup.Pain },
    { name: "כאבי גב", code: 4003, group: MedicalCodeGroup.Pain },
    { name: "כאבי עיניים", code: 4004, group: MedicalCodeGroup.Pain },
    { name: "כאבי ראש", code: 4005, group: MedicalCodeGroup.Pain },
    { name: "כאבים באיבר מין", code: 4006, group: MedicalCodeGroup.Pain },
    { name: "כאבים בגרון", code: 4007, group: MedicalCodeGroup.Pain },
    { name: "כאבים בידיים", code: 4008, group: MedicalCodeGroup.Pain },
    { name: "כאבים בכל הגוף", code: 4009, group: MedicalCodeGroup.Pain },
    { name: "כאבים בצוואר", code: 4010, group: MedicalCodeGroup.Pain },
    { name: "כאבים ברגליים", code: 4011, group: MedicalCodeGroup.Pain },
    { name: "כאבי שיניים", code: 4012, group: MedicalCodeGroup.Pain },
    { name: "אחר", code: 4099, group: MedicalCodeGroup.Pain },
    //#endregion
    //#region Cardio
    { name: "מערכת הלב וכלי הדם", group: MedicalCodeGroup.Cardio },
    { name: "בעיות בקוצב לב / דפיברילטור מושתל", code: 5010, group: MedicalCodeGroup.Cardio },
    { name: "בצקת ריאות / החמרה באי ספיקת לב", code: 5000, group: MedicalCodeGroup.Cardio },
    { name: "ברדיקרדיה", code: 5001, group: MedicalCodeGroup.Cardio },
    { name: "דום לב ונשימה", code: 5002, group: MedicalCodeGroup.Cardio },
    { name: "דפיקות לב", code: 5003, group: MedicalCodeGroup.Cardio },
    { name: "הלם קרדיוגני", code: 5011, group: MedicalCodeGroup.Cardio },
    { name: "הפרעות קצב אחרות", code: 5004, group: MedicalCodeGroup.Cardio },
    { name: "חסם עלייתי - חדרי", code: 5012, group: MedicalCodeGroup.Cardio },
    { name: "חשד לאוטם בשריר הלב", code: 5013, group: MedicalCodeGroup.Cardio },
    { name: "חשד למוות בעריסה", code: 5009, group: MedicalCodeGroup.Cardio },
    { name: "חשד לתסמונת כלילית חריפה", code: 5005, group: MedicalCodeGroup.Cardio },
    { name: "טאכיקרדיה חדרית (VT)", code: 5014, group: MedicalCodeGroup.Cardio },
    { name: "טאכיקרדיה על חדרית (PSVT)", code: 5015, group: MedicalCodeGroup.Cardio },
    { name: "יתר לחץ דם", code: 5006, group: MedicalCodeGroup.Cardio },
    { name: "לחץ דם נמוך", code: 5007, group: MedicalCodeGroup.Cardio },
    { name: "פרפור / רפרוף פרוזדורים", code: 5016, group: MedicalCodeGroup.Cardio },
    { name: "שינויים בא.ק.ג", code: 5008, group: MedicalCodeGroup.Cardio },
    { name: "אחר", code: 5099, group: MedicalCodeGroup.Cardio },
    //#endregion
    //#region Pulmonary
    { name: "מערכת הנשימה", group: MedicalCodeGroup.Pulmonary },
    { name: "דום נשימה", code: 6000, group: MedicalCodeGroup.Pulmonary },
    { name: "החמרה ב - COPD", code: 6004, group: MedicalCodeGroup.Pulmonary },
    { name: "התקף אסטמה", code: 6005, group: MedicalCodeGroup.Pulmonary },
    { name: "חנק / אספירציה / גוף זר", code: 6001, group: MedicalCodeGroup.Pulmonary },
    { name: "חשד לדלקת ריאות", code: 6006, group: MedicalCodeGroup.Pulmonary },
    { name: "חשד לתסחיף ריאתי", code: 6007, group: MedicalCodeGroup.Pulmonary },
    { name: "סטרידור", code: 6008, group: MedicalCodeGroup.Pulmonary },
    { name: "קוצר נשימה", code: 6002, group: MedicalCodeGroup.Pulmonary },
    { name: "שיעול / שיעול דמי", code: 6003, group: MedicalCodeGroup.Pulmonary },
    { name: "אחר", code: 6099, group: MedicalCodeGroup.Pulmonary },
    //#endregion
    //#region Neurology
    { name: "נוירולוגיה", group: MedicalCodeGroup.Neurology },
    { name: "בלבול", code: 7001, group: MedicalCodeGroup.Neurology },
    { name: "התעלפות", code: 7002, group: MedicalCodeGroup.Neurology },
    { name: "לאחר התעלפות", code: 7003, group: MedicalCodeGroup.Neurology },
    { name: "חולשה כללית", code: 7004, group: MedicalCodeGroup.Neurology },
    { name: "חוסר הכרה", code: 7005, group: MedicalCodeGroup.Neurology },
    { name: "ירידה בתפקוד", code: 7006, group: MedicalCodeGroup.Neurology },
    { name: "לאחר פרכוס", code: 7007, group: MedicalCodeGroup.Neurology },
    { name: "סחרחורות", code: 7008, group: MedicalCodeGroup.Neurology },
    { name: "פרכוסים", code: 7009, group: MedicalCodeGroup.Neurology },
    { name: "שבץ מוחי / שבץ מוחי חולף (TIA / CVA)", code: 7010, group: MedicalCodeGroup.Neurology },
    { name: "שינוי במצב ההכרה", code: 7011, group: MedicalCodeGroup.Neurology },
    { name: "אחר", code: 7099, group: MedicalCodeGroup.Neurology },
    //#endregion
    //#region Digestion
    { name: "מערכת העיכול", group: MedicalCodeGroup.Digestion },
    { name: "בחילות ו/ או הקאות", code: 8000, group: MedicalCodeGroup.Digestion },
    { name: "דימום רקטאלי", code: 8001, group: MedicalCodeGroup.Digestion },
    { name: "הקאות דמיות", code: 8002, group: MedicalCodeGroup.Digestion },
    { name: "חשד לגסטרואנטריטיס", code: 8005, group: MedicalCodeGroup.Digestion },
    { name: "חשד לחסימת מעיים", code: 8006, group: MedicalCodeGroup.Digestion },
    { name: "חשד למצב חירום בטני", code: 8007, group: MedicalCodeGroup.Digestion },
    { name: "כיב פפטי", code: 8008, group: MedicalCodeGroup.Digestion },
    { name: "מלנה", code: 8009, group: MedicalCodeGroup.Digestion },
    { name: "עצירות", code: 8003, group: MedicalCodeGroup.Digestion },
    { name: "שלשולים", code: 8004, group: MedicalCodeGroup.Digestion },
    { name: "אחר", code: 8099, group: MedicalCodeGroup.Digestion },
    //#endregion
    //#region Septic
    { name: "זיהומי", group: MedicalCodeGroup.Septic },
    { name: "חום גבוה", code: 9000, group: MedicalCodeGroup.Septic },
    { name: "חשד למנינגיטיס", code: 9001, group: MedicalCodeGroup.Septic },
    { name: "חשד לספסיס / הלם ספטי", code: 9002, group: MedicalCodeGroup.Septic },
    { name: "צלוליטיס", code: 9003, group: MedicalCodeGroup.Septic },
    { name: "אחר", code: 9099, group: MedicalCodeGroup.Septic },
    //#endregion
    //#region Psychiatry
    { name: "פסיכיאטריה", group: MedicalCodeGroup.Psychiatry },
    { name: "חולה משתולל", code: 1001, group: MedicalCodeGroup.Psychiatry },
    { name: "חשד להפרעות נפשיות", code: 1005, group: MedicalCodeGroup.Psychiatry },
    { name: "חשד להתקף פסיכוטי", code: 1006, group: MedicalCodeGroup.Psychiatry },
    { name: "חשד לניסיון אובדני", code: 1002, group: MedicalCodeGroup.Psychiatry },
    { name: "חשד לתגובת חרדה", code: 1003, group: MedicalCodeGroup.Psychiatry },
    { name: "מחשבות אובדניות", code: 1004, group: MedicalCodeGroup.Psychiatry },
    { name: "אחר", code: 1099, group: MedicalCodeGroup.Psychiatry },
    //#endregion
    //#region Endocrinology
    { name: "אנדוקרינולוגיה", group: MedicalCodeGroup.Endocrinology },
    { name: "בעיות בבלוטת התריס", code: 1102, group: MedicalCodeGroup.Endocrinology },
    { name: "היפוגליקמיה", code: 1100, group: MedicalCodeGroup.Endocrinology },
    { name: "היפרגליקמיה", code: 1101, group: MedicalCodeGroup.Endocrinology },
    { name: "אחר", code: 1199, group: MedicalCodeGroup.Endocrinology },
    //#endregion
    //#region Genital
    { name: "מערכת המין והשתן", group: MedicalCodeGroup.Genital },
    { name: "אצירת שתן", code: 1200, group: MedicalCodeGroup.Genital },
    { name: "בעיות גניקולוגיות", code: 1201, group: MedicalCodeGroup.Genital },
    { name: "דימום וגינאלי", code: 1202, group: MedicalCodeGroup.Genital },
    { name: "דלקת בדרכי השתן", code: 1203, group: MedicalCodeGroup.Genital },
    { name: "דם בשתן", code: 1204, group: MedicalCodeGroup.Genital },
    { name: "חשד להפלה", code: 1205, group: MedicalCodeGroup.Genital },
    { name: "חשד לעווית כלייתית (colic renal)", code: 1206, group: MedicalCodeGroup.Genital },
    { name: "ירידת מים", code: 1207, group: MedicalCodeGroup.Genital },
    { name: "צירי לידה", code: 1208, group: MedicalCodeGroup.Genital },
    { name: "קבלת לידה", code: 1209, group: MedicalCodeGroup.Genital },
    { name: "אחר", code: 1299, group: MedicalCodeGroup.Genital },
    //#endregion
    //#region General
    { name: "כללי", group: MedicalCodeGroup.General },
    { name: "אירוע ללא נפגעים", code: 1300, group: MedicalCodeGroup.General },
    { name: "המטופל מסרב לפינוי", code: 1305, group: MedicalCodeGroup.General },
    { name: "המטופל מסרב לקבל טיפול", code: 1306, group: MedicalCodeGroup.General },
    { name: "המשפחה מסרבת טיפול", code: 1307, group: MedicalCodeGroup.General },
    { name: "המשפחה מסרבת לפינוי", code: 1308, group: MedicalCodeGroup.General },
    { name: "ללא מחלה או פגיעה", code: 1312, group: MedicalCodeGroup.General },
    { name: "מוות ודאי - לא בוצעה החייאה", code: 1313, group: MedicalCodeGroup.General },
    { name: "קריאת שווא", code: 1314, group: MedicalCodeGroup.General },
    { name: "חשש לחיי אדם", code: 1315, group: MedicalCodeGroup.General },
    { name: "בדיקות דם לא תקינות", code: 1316, group: MedicalCodeGroup.General },
    { name: 'העברה מבי"ח לבי"ח', code: 1317, group: MedicalCodeGroup.General },
    { name: "העברה מהבית למתקן רפואי", code: 1318, group: MedicalCodeGroup.General },
    { name: "העברה ממתקן רפואי הביתה", code: 1319, group: MedicalCodeGroup.General },
    { name: "העברה ממתקן רפואי לבית אבות", code: 1320, group: MedicalCodeGroup.General },
    { name: "קביעת מוות / הכרזה על מוות", code: 1350, group: MedicalCodeGroup.General },
    { name: "אחר", code: 1399, group: MedicalCodeGroup.General },
    //#endregion
];

export const MedicalRolesNames: string[] = ["נהג", "חובש", "פראמדיק", "רופא", "מתנדב", "משתלם", "שירות לאומי"];
