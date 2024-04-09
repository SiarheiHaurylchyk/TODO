



import {TaskStateType} from "common/components/TodoList/IterableTodo/Task/TaskSlice";
import {ReorderTodoListArgs} from "features/api/TodoListAPI";
import {TodoListDomainType} from "common/components/TodoList/IterableTodo/TodoListSlice";


export function DragAndDropChangeTodoId(
    todolists: Array<TodoListDomainType>,
    arg: ReorderTodoListArgs
): string | null {
    const startDrag = todolists.findIndex(
        (tl, index) => tl.id === arg.startDragId && index >= 0
    );
    const endDrop = todolists.findIndex(
        (tl, index) => tl.id === arg.endShiftId && index >= 0
    );

    if (endDrop > 0 && endDrop < startDrag) {
        return todolists[endDrop - 1].id;
    } else if (endDrop > startDrag) {
        return arg.endShiftId;
    } else {
        return null;
    }
}

