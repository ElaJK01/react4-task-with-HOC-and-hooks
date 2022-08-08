import React from "react";
import { useQuery } from "@apollo/client";
import { keys, values, zipObj } from "ramda";
import Loading from "./components/loading";
import Error from "./components/error";

const withLoadingData = (Component, query) => (props) => {
  const { match } = props;
  const { params } = match;
  const paramsKey = keys(params);
  const paramsValues = values(params);
  const variablesObj = zipObj(paramsKey, paramsValues);
  const { data, loading, error } = useQuery(query, {
    variables: variablesObj,
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  return <Component data={data} loading={loading} error={error} />;
};

export default withLoadingData;
