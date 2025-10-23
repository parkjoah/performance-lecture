import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const ListPage = lazy(() => import(`./pages/ListPage/index`));
const ViewPage = lazy(() => import(`./pages/ViewPage/index`));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>로딩중...</div>}>
        <Routes>
          <Route path="/" Component={ListPage} exact />
          <Route path="/view/:id" Component={ViewPage} exact />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
