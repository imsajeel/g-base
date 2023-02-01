export type userType = {
  _id: string;
  username: string;
  token: string;
  siteId: string;
  isActive: boolean;
};

export type siteType = {
  _id: string;
  name: string;
  siteCode: string;
  expiry: string;
  isActive: boolean;
  address: string;
  phone: string;
  logoImage: string;
};
