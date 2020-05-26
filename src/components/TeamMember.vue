<template>
    <div class="member-card">
        <div class="member-card__image"><i class="material-icons" :class="`role-${member.role}`">person</i></div>
        <div class="member-card__content">
            <p>{{ member.name }}</p>
            <p>{{ member.role }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TeamMember extends Vue {
    @Prop({ required: true }) member!: ITeamMember;
}
</script>

<style lang="scss" scoped>
.member-card {
    background: white;
    width: 48%;
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
        padding: 0.6rem;
        padding-top: 0;
        p {
            margin: 0;
        }
    }
}
</style>
