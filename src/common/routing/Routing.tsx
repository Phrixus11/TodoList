import {Main} from "@/app/Main"
import {Login} from "@/features/auth/ui/Login/Login"
import {Route, Routes} from "react-router"
import {PageNotFound} from "@/common/components/PageNotFound/PageNotFound";
import {ProtectedRoute} from "@/common/components/ProtectedRoute/ProtectedRoute";
import {Faq} from "@/common/components/Faq/Faq";
import {useAppSelector} from "@/common/hooks";
import {selectIsLoggedIn} from "@/features/auth/model/auth-slice";

export const Path = {
  Main: '/',
  Login: '/login',
  Faq: '/faq',
  NotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
      <Routes>
        <Route element={<ProtectedRoute isAllowed={isLoggedIn}/>}>
          <Route path={Path.Main} element={<Main/>}/>
          <Route path={Path.Faq} element={<Faq/>}/>
        </Route>

        <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}/>}>
          <Route path={Path.Login} element={<Login/>}/>
        </Route>

        {/*<Route path={Path.Faq} element={*/}
        {/*  <ProtectedRoute isAllowed={isLoggedIn}>*/}
        {/*    <Faq/>*/}
        {/*  </ProtectedRoute>}/>*/}


        <Route path={Path.NotFound} element={<PageNotFound/>}/>
      </Routes>
  )
}