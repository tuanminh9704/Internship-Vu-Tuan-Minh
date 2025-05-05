import { router } from "../../routes";
import { useRoutes } from "react-router"

export const AllRouter = () => {
    const element = useRoutes(router);
    return(
        <>
            {element}
        </>
    )

}