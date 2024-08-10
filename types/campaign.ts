export type Campaign = {
  creatorAvatarUrl: string;
  creator: string;
  campaign: string;
  campaignIcon: string;
  campaignUrl: string;
  id: string;
  lastEdit: {
    date: string;
    time: string;
  };
  status: "Success" | "Pending" | "Canceled";
};
