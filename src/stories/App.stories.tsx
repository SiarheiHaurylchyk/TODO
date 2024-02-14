import {Meta, StoryObj} from "@storybook/react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "./Decorator";


const meta:Meta<typeof App>={
    title: "App",
    component:App,
    tags:['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;


export type Story = StoryObj<typeof App>

export const EditableSpanExample: Story = {};