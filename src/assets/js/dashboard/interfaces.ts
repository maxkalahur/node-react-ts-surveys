export interface IFolder {
    id: string,
    name: string;
}

export interface ISurvey {
    id: string,
    title: string;
    organizationName: string;
    organizationId: string;
    link: string;
    isMultipleProviders: boolean;
    isContactPageOff: boolean;
    lastResponseDateAt: Date;
    updatedAt: Date;
    createdAt: Date;
}