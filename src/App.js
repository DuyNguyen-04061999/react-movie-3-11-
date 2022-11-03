import { Route, Routes } from "react-router-dom";
import "swiper/css";
import Banner from "components/banner/Banner";
import Main from "components/layout/Main";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("components/pages/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("components/pages/MovieDetailsPage")
);
const MoviesV2 = lazy(() => import("components/pages/MoviesV2"));

export default function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner type="upcoming" />
                  <HomePage />
                </>
              }
            />
            <Route path="/movies" element={<MoviesV2 />} />
            <Route path="/movies/:movieID" element={<MovieDetailsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
