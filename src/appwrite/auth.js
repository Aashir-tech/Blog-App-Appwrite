import config from '../config/config';
import {Client , Account , ID} from 'appwrite';

export class AuthService{

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password , name}) {
        try {
            const userAccount = await this.account.create(ID.unique() , email, password , name); 
            console.log("User Account created")
            
            if(userAccount) {
                console.log("Inside")
                return userAccount
                // call another method
                // this.login({email , password})
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        // Get the currently logged in user.
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error " , error);
            // return false;
        }

        return null
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AppWrite Service :: logout :: error " , error )
        }
    }

}

const authService = new AuthService();

export default authService