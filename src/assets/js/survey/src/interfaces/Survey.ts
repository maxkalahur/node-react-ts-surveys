import { Doctor } from "./Doctor";

export interface Survey {
    id: string;
    logoUrl: string;
    isMedspaOff: boolean;
    isMultipleProviders: boolean;
    location: {
        googleReviewUrl: string;
        facebookReviewUrl: string;
        healthgradesReviewUrl: string;
    };
    doctors: Doctor[];
  }