export type TDashboardResponseItem = {
    id: string;
    deviceType: string;
    browserType: string;
    score: number;
    why: string;
    provider: string;
    name: string;
    email: string;
    phone: string;
    statusFormatted: string;
    createdAtFormatted: string;
    updatedAtFormatted: string;
    isContactMeFormatted: string;
}