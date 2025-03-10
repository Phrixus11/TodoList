import {Button} from "./Button.tsx";
import {FilterValuesType} from "../App.tsx";

type FilterButtonProps = {
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
}

export const FilterButton = ({changeTodolistFilter}:FilterButtonProps) => {
    return (
        <div>
            <Button title={'All'} onClickHandler={()=>changeTodolistFilter('All')} />
            <Button title={'Active'} onClickHandler={()=>changeTodolistFilter('Active')}/>
            <Button title={'Completed'} onClickHandler={()=>changeTodolistFilter('Completed')}/>
        </div>
    );
};

