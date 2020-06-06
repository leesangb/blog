/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import TopLayout from './src/components/TopLayout';
import Layout from "./src/components/Layout";

export const wrapRootElement = ({ element }) => {
    return <TopLayout>{element}</TopLayout>;
};

export const wrapPageElement = ({ element }) => {
    return <Layout>{element}</Layout>
};