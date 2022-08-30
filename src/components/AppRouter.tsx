import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { privateRoutes, publicRoutes, RouteNames } from "../router";

const AppRouter: FC = () => {
    const { isAuth } = useTypedSelector(state => state.auth)

    return (
        isAuth ?
            <Routes>
                {privateRoutes.map((route, index) => <Route path={route.path} element={<route.component />} key={index} />
                )}
                <Route
                    path="*"
                    element={<Navigate to={RouteNames.EVENT} replace />}
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route, index) => <Route path={route.path} element={<route.component />} key={index} />
                )}
                <Route
                    path="*"
                    element={<Navigate to={RouteNames.LOGIN} replace />}
                />
            </Routes>
    );
}

export default AppRouter;
