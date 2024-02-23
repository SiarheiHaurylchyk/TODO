import {AddItemForm} from "../components/AddItemForm";
import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'


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
        addItem: action('Button clicked inside form')
    },
};