import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../components/EditableSpan";


const meta:Meta<typeof EditableSpan>={
    title: "EditableSpan",
    component:EditableSpan,
    tags:['autodocs'],
    argTypes:{
        oldTitle: {
            description: 'Hello'
        },
        updateTasksHandler:{
           defaultValue:"Calbback updateTasksHandler"
        }
    }
}

export default meta;


export type Story = StoryObj<typeof EditableSpan>

export const EditableSpanExample: Story = {
    args: {
        oldTitle:"Hello",
       updateTasksHandler:action("Callback")
    },
};