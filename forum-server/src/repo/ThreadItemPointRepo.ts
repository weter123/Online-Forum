import { getManager } from "typeorm";
import { ThreadItem } from "./ThreadItem";
import { ThreadItemPoint } from "./ThreadItemPoints";
import { User } from "./User";

export const updateThreadItemPoint = async(
    userId: string,
    threadItemId: string,
    increment: boolean
): Promise<string> => {
    //todo: check user is authenticated
    let message = "failed to increment thread point.";
    const threadItem = await ThreadItem.findOne({
        where: {id: threadItemId},
        relations: ["user"],
    });

    if(!threadItem) {
        return message + ` thread Item ${threadItem} not found.`;
    }

    if(threadItem!.user!.id === userId) {
        message = "Error: users cannot increment their own threads";
        return message;
    }

    const user = await User.findOne({
        where: {id: userId}
    });

    if(!user){
        return message + "user not found";
    }

    const existingPoint = await ThreadItemPoint.findOne({
        where : {
            threadItem : {id: threadItemId},
            user: {id : userId}
        },
    })

    await getManager().transaction(async(transactionEntityManager ) => {
        if(existingPoint){
            if(increment){
                if(existingPoint.isDecrement){
                    await ThreadItemPoint.remove(existingPoint);
                    threadItem!.points = Number(threadItem!.points) + 1;
                    threadItem!.lastModifiedOn = new Date();
                    threadItem!.save();
                }
            } else {
                if(!existingPoint.isDecrement){
                    await ThreadItemPoint.remove(existingPoint);
                    threadItem!.points = Number(threadItem!.points) - 1;
                    threadItem!.lastModifiedOn = new Date();
                    threadItem!.save();
                }
            }
        } else {
            await ThreadItemPoint.create({
                threadItem,
                isDecrement: !increment,
                user,
            }).save();
            if(increment) {
                threadItem!.points = Number(threadItem!.points) + 1;
            } else{
                threadItem!.points = Number(threadItem!.points) - 1;
            }
            threadItem!.lastModifiedOn = new Date();
            threadItem!.save();
        }

        message = `Successfully ${
            increment ? "incremented" : "decremented"
        } point.`;
    });
    return message;
}