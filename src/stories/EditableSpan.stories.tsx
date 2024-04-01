import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "../common/components/EditableSpan/EditableSpan";



const meta:Meta<typeof EditableSpan>={
    title: "EditableSpan",
    component:EditableSpan,
    tags:['autodocs'],
    argTypes:{
        oldTitle: {
            description: 'Props Text'
        },
        updateTasksCallbackHandler:{
          description: "Function callback for change text"
        }
    },

}

export default meta;


export type Story = StoryObj<typeof EditableSpan>

export const EditableSpanExample: Story = {
    args: {
        oldTitle:"Please enter text",
        updateTasksCallbackHandler:action("Callback")
    },
};