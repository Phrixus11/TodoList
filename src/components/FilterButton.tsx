import {Button} from "./Button.tsx";

export const FilterButton = () => {
    return (
        <div>
            <Button title={'All'}/>
            <Button title={'Active'}/>
            <Button title={'Completed'}/>
        </div>
    );
};

