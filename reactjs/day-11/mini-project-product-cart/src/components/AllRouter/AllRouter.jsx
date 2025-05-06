import {useRoutes} from 'react-router';
import { router } from '../../routes';

export const AllRouter = () => {
    const element = useRoutes(router);
    return (
        <>
            {element}
        </>
    )
}