import type {Todolist} from "@/features/todolists/api/todolistsApi.types";
import type {RequestStatus} from "@/common/types";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}
