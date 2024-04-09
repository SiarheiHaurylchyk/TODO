import {ReorderTodoListArgs} from "features/api/TodoListAPI";
import {TodoListDomainType} from "common/components/TodoList/IterableTodo/TodoListSlice";
import {TaskTypeEntity} from "common/components/TodoList/IterableTodo/Task/TaskSlice";


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

type argTyep = {
    todoListId: string;
    TaskId: string;
    dragID: string;
}

export function DragAndDropChangeTaskId(
    tasks: TaskTypeEntity[],
    arg: argTyep
): string | null {
    const startDrag = tasks.findIndex((item, index) => item.id === arg.dragID && index >= 0)
    const endDrop = tasks.findIndex((item, index) => item.id === arg.TaskId  && index >= 0)
    if (endDrop > 0 && endDrop < startDrag) {
        return tasks[endDrop - 1].id;
    } else if (endDrop > startDrag) {
        return arg.TaskId;
    } else {
        return null;
    }
}

