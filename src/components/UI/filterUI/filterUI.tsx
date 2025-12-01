import type { FC } from "react";
import type { TItemComponent } from "../../../utils/types";

interface IFilterUI {
    Cards: [TItemComponent]
}

export const FilterUI: FC<IFilterUI> = ({ Cards }) => {
    return (
        <>
            {Cards.map}
        </>
    )
}