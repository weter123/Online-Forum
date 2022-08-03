
import { IResolvers } from "apollo-server-express"
import { QueryArrayResult, QueryOneResult } from "../repo/QueryArrayResult";
import { Thread } from "../repo/Thread";
import { createThread, getThreadByCategoryId, getThreadById } from "../repo/ThreadRepo";
import { GqlContext } from "./GqlContext";

interface EntityResult {
    messages: Array<string>;

}
const resolvers: IResolvers = {
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
    },
};
export default resolvers;