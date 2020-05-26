//Modal components
import _AddTeamMember from "./Modals/AddTeamMember.vue";
import _ChangeName from "./Modals/ChangeName.vue";
import _MedicalCodes from "./Modals/MedicalCodes.vue";
import _SendToMoked from "./Modals/SendToMoked.vue";
import _Settings from "./Modals/Settings.vue";
//General components
import _AppBar from "./AppBar.vue";
import _Button from "./Button.vue";
import _ContactMessage from "./ContactMessage.vue";
import _HomeButton from "./HomeButton.vue";
import _Modal from "./Modal.vue";
import _TeamMember from "./TeamMember.vue";
import _ToolsMenu from "./ToolsMenu.vue";

export namespace ModalComponents {
    export const AddTeamMember = _AddTeamMember;
    export const ChangeName = _ChangeName;
    export const MedicalCodes = _MedicalCodes;
    export const SendToMoked = _SendToMoked;
    export const Settings = _Settings;
}

//Moked Page Components
export namespace MokedPageComponents {
    export const Forms = () => import("@/components/MokedPage/Forms.vue");
    export const General = () => import("@/components/MokedPage/General.vue");
    export const Team = () => import("@/components/MokedPage/Team.vue");
}

export namespace Components {
    export const AppBar = _AppBar;
    export const Button = _Button;
    export const ContactMessage = _ContactMessage;
    export const HomeButton = _HomeButton;
    export const Modal = _Modal;
    export const TeamMember = _TeamMember;
    export const ToolsMenu = _ToolsMenu;
}
