import { router } from "../../routes";
import { useRoutes } from "react-router-dom"

export const AllRouter = () => {
    const element = useRoutes(router);
    return(
        <>
            {element}
        </>
    )

}