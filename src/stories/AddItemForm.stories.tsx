
import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";


const meta:Meta<typeof AddItemForm>={
    title: "AddItemForm",
    component:AddItemForm,
    tags:['autodocs'],
    argTypes:{
        addItem:{
            description: "About the item",
        }
    }
}

export default meta;


export type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
    args: {
        addItem: action('ButtonAndMenu clicked inside form')
    },
};