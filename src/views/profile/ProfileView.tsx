import ProfileForm from "@/components/profile/ProfileForm"
import { useProfile } from "@/hooks/useProfile"

export default function ProfileView() {


    const {isLoading:isLoadingProfile,data:userData} = useProfile()

    if(isLoadingProfile) return 'cargando datos de usuario...'
    if(userData) return <ProfileForm user={userData} />
}
