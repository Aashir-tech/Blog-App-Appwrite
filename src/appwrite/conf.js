import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    // We can also call bucket as storage

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, featuredImage, status, userId }) {
        try {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            // ID.unique(),
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );
        } catch (error) {
        console.log("AppWrite service error :: createPost :: error ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
            title,
            content,
            featuredImage,
            status,
            }
        );
        } catch (error) {
        console.log("AppWrite service error :: updatePost :: error ", error);
        }
    }

    async deletePost(slug) {
        try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
        return true;
        } catch (error) {
        console.log("Appwrite service error :: deletePost :: error ", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service error :: getPost :: error " , error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]) {
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service error :: getPosts :: error " , error);
        }
    }

    // File Upload Service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service error :: createFile :: error " , error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service error :: deleteFile :: error " , error);
            return false
        }
    }

    async getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

    // Creating a comment
    async createComment({postId ,userId ,content, username = "Random"}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                ID.unique(),
                {
                    postId,
                    userId,
                    content,
                    username,
                    createdAt : new Date().toISOString()
                }
            )
        } catch (error) {
            console.log("Appwrite service error :: createComment :: error " , error);
        }
    }

    // Fetch a comment
    async fetchComments(postId) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                [Query.equal("postId" , postId)]
            )
        } catch (error) {
            console.log("Appwrite service error :: fetchComment :: error " , error);
        }
    } 

    async getComment(userId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                userId
            )
        } catch (error) {
            console.log("Appwrite service error :: getComment :: error " , error);
        }
    }

    async updateComment(commentId , { content}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                commentId,
                {
                    content
                }
            )
        } catch (error) {
            console.log("Appwrite service error :: updateComment :: error " , error);
        }
    }

    async deleteComment(commentId) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                commentId
            )
        } catch (error) {
            console.log("Appwrite service error :: getComment :: error " , error);
        }
    }
}

const service = new Service();

export default service;
