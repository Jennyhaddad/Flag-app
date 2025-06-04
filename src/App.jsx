import './App.css'

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

//layouts
import RootLayout from "./layouts/RootLayout";

//pages
import Home from "./Home" ;
import CountryPage from "./CountryPage";


const router = createBrowserRouter (
    createRoutesFromElements (
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/country/:countryName" element={<CountryPage />} />
        </Route>      
    ))

 function App() {
     return <RouterProvider router={router}/>  
       
 }
 
 export default App