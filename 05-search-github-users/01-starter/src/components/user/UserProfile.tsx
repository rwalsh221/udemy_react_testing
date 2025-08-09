type UserProfileProps = {
  userName: string;
};

const UserProfile = ({ userName }: UserProfileProps) => {
  return <h1 className="text-2xl font-bold">{userName}</h1>;
};

export default UserProfile;
