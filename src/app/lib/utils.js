
const formatWalletAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

 const getDisplayName = (user) => { 
    const twitterProfile = user?.linkedAccounts?.find(acc => acc.type === 'twitter_oauth');
    const walletProfile = user?.linkedAccounts?.find(acc => acc.type === 'wallet');
  
    if (twitterProfile) {
      return twitterProfile.name || twitterProfile.username;
    }   else if (walletProfile) {
      return formatWalletAddress(walletProfile.address);
    }  
    return formatWalletAddress(user?.email?.address);
  };


  const getProfileImage = (user) => { 
    const twitterProfile = user?.linkedAccounts?.find(acc => acc.type === 'twitter_oauth');
    const walletProfile = user?.linkedAccounts?.find(acc => acc.type === 'wallet'); 
    if (twitterProfile) {
      return twitterProfile.profilePictureUrl || "https://content.cointopper.com/wp-content/uploads/2024/12/pfp.png";
    }  else if (walletProfile) {
      return "https://content.cointopper.com/wp-content/uploads/2024/12/pfp.png";
    }  
    return "https://content.cointopper.com/wp-content/uploads/2024/12/pfp.png";
  };

  export const generateUserData = (user) => {
    const avatar = getProfileImage(user);
    const displayName = getDisplayName(user); 
    const userData = {
      username: displayName,
      wallet: user?.linkedAccounts[0]?.address || "",  
      profilePicture: avatar || "",
    };
  
    return userData;
  };