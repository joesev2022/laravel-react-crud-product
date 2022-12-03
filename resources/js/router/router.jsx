import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexProducts from '../components/products';
import EditProduct from '../components/products/edit';
import NewProduct from '../components/products/new';
import NotFound from '../components/products/not-found';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/product/edit/:id" element={ <EditProduct/> }/>
                <Route path="/product/new" element={ <NewProduct/> }/>
                <Route path="/" element={ <IndexProducts/> }/>
                <Route path="/*" element={ <NotFound/> }/>
            </Routes>
        </div>
    );
}

export default Router;
