import {Meta, StoryObj} from "@storybook/react";
import Task from "../components/Task";
import {action} from "@storybook/addon-actions";

const meta:Meta<typeof Task>={
    title: "Task",
    component:Task,
    tags:['autodocs'],
    argTypes:{
        element:{
           description:"Obj task",
        },
        removeTask:{
            description:"This function delet task",
        },
        updateTasksObjHandler:{
            description:"This function update task",

        },
        onCheckHandler: {
            description: "This function change task check",
        }

    }
}

export default meta;


export type Story = StoryObj<typeof Task>

export const TaskStory: Story = {
    args:{
        element:{id:"12312",title:"Helo",isDone:false},
        removeTask:action("Delete task"),
        updateTasksObjHandler:action("UpdateTask"),
        onCheckHandler:action("Chenge my checked ")
    }
};