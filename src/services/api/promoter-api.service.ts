import { IUser } from "../../interfaces/user.interface";
import { User } from "../../models/user.model";
import { TCheckAdminUserResponse } from "../../types/promoter-api-responses/check-admin-user-response.type";
import config from "../../config";
import axios from 'axios';

export class PromoterApiService {

    private secretKey = config.promoterApi.secretKey;
    private promoterDomain = config.promoterApi.domain;

    private methods = [
        '/get-ehr-contact-data',                // GET
        '/get-survey-data',                     // GET
        '/get-survey-data-by-contact-id',       // GET
        '/get-contact-data',                    // GET
        '/check-admin-user',                    // GET
        '/save-feedback',                       // POST
    ];

    public async call(query: string, payload: {[key: string]: any}, type: 'get' | 'post' = 'get' ): Promise<any> {

        if( !this.methods.includes( query ) ) {
            throw Error("Promoter API end point is not existed");
        }

        try {
            
            payload._key = this.secretKey;
            
            const { data, status } = await axios[type] <TCheckAdminUserResponse> (
                this.promoterDomain + '/survey-api' + query,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                    params: payload
                },
            );

            console.log(JSON.stringify(data, null, 4));

            // 👇️ "response status is: 200"
            console.log('response status is: ', status);

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

}