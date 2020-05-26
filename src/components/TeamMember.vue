<template>
    <div class="member-card">
        <div class="member-card__image"><i class="material-icons" :class="`role-${member.role}`">person</i></div>
        <div class="member-card__content">
            <p class="member-card__content-name">{{ member.name }}</p>
            <p class="member-card__content-role">{{ roleName }}</p>
            <md-menu :mdCloseOnSelect="true" md-align-trigger>
                <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                </md-button>
                <md-menu-content>
                    <md-menu-item @click="editMember">
                        <span>ערוך</span>
                        <md-icon>edit</md-icon>
                    </md-menu-item>

                    <md-menu-item @click="deleteMember">
                        <span>מחק</span>
                        <md-icon>delete</md-icon>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { MedicalRolesNames } from "@/utils/helperMethods";

@Component
export default class TeamMember extends Vue {
    roleName!: string;
    @Prop({ required: true }) readonly index!: number;
    get member(): ITeamMember {
        let member: ITeamMember = this.$store.state.teamMembers[this.index];
        this.roleName = MedicalRolesNames[member.role];
        return member;
    }
    editMember() {
        this.$store.dispatch("alert/addTeamMember", this.index);
    }
    deleteMember() {
        this.$store.dispatch("removeTeamMember", this.index);
    }
}
</script>

<style lang="scss" scoped>
.member-card {
    background: white;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    width: 45%;
    // padding: 0 0.5rem;
    margin: 0.5rem 0.2rem;
    @include desktop {
        width: 24%;
    }
    &__image {
        text-align: center;
        i.material-icons {
            font-size: 6rem;
            &.role {
                &-0,
                &-1,
                &-5,
                &-6 {
                    color: $Medic;
                }
                &-2,
                &-3 {
                    color: $Paramedic;
                }
                &-4 {
                    color: $Volunteer;
                }
            }
        }
    }
    &__content {
        position: relative;
        padding: 0.6rem;
        padding-top: 0;
        &-name {
            margin: 0;
            font-weight: bold;
            font-size: 1.1rem;
        }
        &-role {
            margin: 0;
            font-size: 0.9rem;
        }
        .md-menu {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}
.md-menu-content {
    background: white;
}
</style>
