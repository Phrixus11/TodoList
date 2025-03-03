import {Button} from "./Button.tsx";
import {FilterValuesType} from "../App.tsx";

type FilterButtonProps = {
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
}

export const FilterButton = ({changeTodolistFilter}:FilterButtonProps) => {
    return (
        <div>
            <Button title={'All'} changeTodolistFilter={()=>changeTodolistFilter('All')} />
            <Button title={'Active'} changeTodolistFilter={()=>changeTodolistFilter('Active')}/>
            <Button title={'Completed'} changeTodolistFilter={()=>changeTodolistFilter('Completed')}/>
        </div>
    );
};

