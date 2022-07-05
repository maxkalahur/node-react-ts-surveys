export type TDashboardSurveyItem = {
    id: string,
    title: string;
    link: string;
    organizationName: string;
    organizationId: string;
    amountOfResponses: number;
    isMultipleProviders: boolean;
    isContactPageOff: boolean;
    lastResponseDateAt: string | null;
    updatedAt: string | null;
}