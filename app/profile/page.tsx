import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import {EmptyState} from "@/app/components/EmptyState";
import ProfileClient from "@/app/profile/ProfileClient";

const ProfilePage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Profile Found, User Unauthenticated"
                    subtitle='Please login to view your Profile.'
                />
            </ClientOnly>
        )
    }

  return (
      <ClientOnly>
          <ProfileClient
              currentUser={currentUser}
          />
      </ClientOnly>
  );
};

export default ProfilePage;