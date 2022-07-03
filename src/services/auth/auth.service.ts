import { IUser } from "../../interfaces/user.interface";
import { User } from "../../models/user.model";
import { TCheckAdminUserResponse } from "../../types/promoter-api-responses/check-admin-user-response.type";
import config from "../../config";
import axios from 'axios';
import { PromoterApiService } from "../api/promoter-api.service";

export class AuthService {

    constructor(private promoterApiService: PromoterApiService) {

    }

    public async checkIfUserAdmin(key: string) {

        const data = await this.promoterApiService.call('/check-admin-user', { user_api_key: key });

        return data;
    }

}