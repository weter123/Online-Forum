
import { IResolvers } from "apollo-server-express"
import { QueryArrayResult, QueryOneResult } from "../repo/QueryArrayResult";
import { Thread } from "../repo/Thread";
import { updateThreadPoint } from "../repo/ThreadPointRepo";
import { createThread, getThreadByCategoryId, getThreadById } from "../repo/ThreadRepo";
import { User } from "../repo/User";
import { login, logout, me, register, UserResult } from "../repo/UserRepo";
import { GqlContext } from "./GqlContext";

const STANDARD_ERROR = "An error has occurred";

interface EntityResult {
    messages: Array<string>;

}
const resolvers: IResolvers = {
    UserResult: {
        __resolveType(obj: any, context:GqlContext, info :any){
            if(obj.messages){
                return "EntityResult";
            }
            return "User";
        },
    },
    ThreadResult: {
        __resolveType(obj: any, context:GqlContext, info :any){
            if(obj.messages){
                return "EntityResult";
            }
            return "Thread";
        },
        
    },
    ThreadArrayResult: {
        __resolveType(obj: any, context:GqlContext, info :any){
            if(obj.messages){
                return "EntityResult";
            }
            return "ThreadArray";
        },
    },

    Query: {
        getThreadById: async (
            obj: any,
            args: { id: string},
            ctx: GqlContext,
            info: any
        ): Promise<Thread | EntityResult> => {
            let thread: QueryOneResult<Thread>;
            try{
                thread = await getThreadById(args.id);
                if(thread.entity) {
                    return thread.entity;
                }
                return {
                    messages: thread.messages ? [thread.messages[0]] : ["test"],
                };
            } catch (ex){
                throw ex;
            }
        },
        getThreadByCategoryId: async (
            obj: any,
            args: { categoryId: string},
            ctx: GqlContext,
            info: any
        ): Promise< {threads: Array<Thread>} | EntityResult> => {
            let threads: QueryArrayResult<Thread>;
            try{
                threads = await getThreadByCategoryId(args.categoryId);
                if(threads.entities) {
                    return {
                        threads: threads.entities,
                    };
                }
                return {
                    messages: threads.messages ? threads.messages : ["An Error Has occurred"],
                };
            } catch (ex) {
                throw ex;
            }
        },
        me: async (
            obj: any,
            args: null,
            ctx: GqlContext,
            info: any
          ): Promise<User | EntityResult> => {
            let user: UserResult;
            try {
              if (!ctx.req.session?.userId) {
                return {
                  messages: ["User not logged in."],
                };
              }
              user = await me(ctx.req.session.userId);
              if (user && user.user) {
                return user.user;
              }
              return {
                messages: user.messages ? user.messages : [STANDARD_ERROR],
              };
            } catch (ex) {
              throw ex;
            }
          },
    },

    Mutation: {
        createThread: async(
            obj: any, 
            args:{ 
                userId: string;
                categoryId: string;
                title: string;
                body: string;
            },
            ctx:GqlContext,
            info: any
        ): Promise<EntityResult> => {
            let result: QueryOneResult<Thread>;
            try{
                result = await createThread(
                    args.userId,
                    args.categoryId,
                    args.title,
                    args.body
                );

                return {
                    messages: result.messages ? result.messages: ["An Error has occurred"],
                };
            } catch (ex) {
                throw ex;
            }
        },
        updateThreadPoint: async(
            obj: any,
            args : {
                threadId: string;
                increment: boolean;
            },
            ctx: GqlContext,
            info: any
        ): Promise<string> => {
            let result = "";
            try{
                if(!ctx.req.session || !ctx.req.session?.userId) {
                    return "You must be logged in to set likes.";
                }
                result = await updateThreadPoint(
                    ctx.req.session!.userId,
                    args.threadId,
                    args.increment
                );
                return result;
            } catch (ex){
                throw ex;
            }
        },
        updateThreadItemPoint: async( 
            obj: any,
            args : {
                threadItemId: string;
                increment: boolean;
            },
            ctx: GqlContext,
            info: any
        ): Promise<string> => {
            let result = "";
            try{
                if(!ctx.req.session || !ctx.req.session?.userId) {
                    return "You must be logged in to set likes.";
                }
                result = await updateThreadItemPoint(
                    ctx.req.session!.userId,
                    args.threadItemId,
                    args.increment
                );
                return result;
            } catch (ex){
                throw ex;
            }
        },
        register: async(
            obj: any,
            args : {
                email: string;
                userName: string;
                password: string;
            },
            ctx: GqlContext,
            info: any
        ) : Promise<string> => {
            let user: UserResult;
            try{
                user = await register( 
                    args.email,
                    args.userName, 
                    args.password
                );

                if(user && user.user) {
                    return "Registration Successful";
                }
                return user && user.messages ? user.messages[0] : STANDARD_ERROR;
            } catch (ex) {
                throw ex;
            }
        },
        login : async(
            obj: any,
            args : {
                userName: string;
                password: string;
            },
            ctx: GqlContext,
            info: any
        )  : Promise<string> => {
            let user: UserResult;
            try{
                user = await login( 
                    args.userName, 
                    args.password
                );
                if(user && user.user) {
                    ctx.req.session!.userId = user.user.id;
                    return `Login successful for userID ${ctx.req.session!.userId}`;
                }
                return user && user.messages ? user.messages[0] : STANDARD_ERROR;
            } catch (ex){
                throw ex;
            }
        },
        logout : async(
            obj: any,
            args : {
                userName: string;
            },
            ctx: GqlContext,
            info: any
        )  : Promise<string> => {
            try{
                let result = await logout(args.userName);
                ctx.req.session?.destroy((err:any) => {
                    if(err){
                        console.log("destroy session failed");
                        return;
                    }
                    console.log(" session destroyed ",ctx.req.session?.userId)
                });
                return result;
            } catch (ex){
                throw ex;
            }
        },
    }
};
export default resolvers;

function updateThreadItemPoint(userId: string, threadItemId: string, increment: boolean): string | PromiseLike<string> {
    throw new Error("Function not implemented.");
}
