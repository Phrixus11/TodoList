import {Button} from "./Button.tsx";
import {FilterValuesType} from "../App.tsx";


type FilterButtonProps = {
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
    activeFilter: FilterValuesType
}

export const FilterButton = ({changeTodolistFilter, activeFilter}:FilterButtonProps) => {

    return (
        <div>
            <Button className={ activeFilter === "All"?'btn-filter-active': ''} title={'All'} onClickHandler={()=>changeTodolistFilter('All')} />
            <Button className={ activeFilter === "Active" ? 'btn-filter-active' : ''} title={'Active'} onClickHandler={()=>changeTodolistFilter('Active')}/>
            <Button className={ activeFilter === "Completed" ? 'btn-filter-active' : ''} title={'Completed'} onClickHandler={()=>changeTodolistFilter('Completed')}/>
        </div>
    );
};

