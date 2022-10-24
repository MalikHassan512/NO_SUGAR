import {useState, useEffect} from 'react';
import 'url-search-params-polyfill';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import ServiceRequests from '../utils/ServiceRequests';

export const usePaginatorParams = (dataSourceCallback, name, params) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isNextAvailable, setIsNextAvailable] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const token = useSelector(state => state?.auth?.token);

  const request = new ServiceRequests(token);
  const isFocused = useIsFocused();
  //const [request] = useNetworkRequest();

  const getData = async () => {
    if (isNextAvailable) {
      setLoading(true);
      try {
        const {results: _results, next: _next} = await dataSourceCallback(
          request,
          name,
          {
            ...params,
            page: pageNumber,
          },
        );

        if (pageNumber === 1) {
          setResults([..._results]);
        } else {
          setResults([...results, ..._results]);
        }
        if (_next) {
          const urlSearchParams = new URLSearchParams(_next.split('?')[1]);
          const page = urlSearchParams.get('page');

          setPageNumber(page);
          setIsNextAvailable(true);
        } else {
          setIsNextAvailable(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const refreshData = async uuid => {
    try {
      setRefreshing(true);
      const {results: _results, next: _next} = await dataSourceCallback(
        request,
        name,
        {
          ...params,
          page: 1,
          cat_uuid: uuid ? uuid : params?.cat_uuid || null,
        },
      );
      setResults([..._results]);
      if (_next) {
        const urlSearchParams = new URLSearchParams(_next.split('?')[1]);
        const page = urlSearchParams.get('page');
        setPageNumber(page);
        setIsNextAvailable(true);
      } else {
        setPageNumber(1);
        setIsNextAvailable(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  const newData = async my_param => {
    try {
      setRefreshing(true);
      const {results: _results, next: _next} = await dataSourceCallback(
        request,
        name,
        {
          ...params,
          page: 1,
          ...my_param,
        },
      );
      setResults([..._results]);
      if (_next) {
        const urlSearchParams = new URLSearchParams(_next.split('?')[1]);
        const page = urlSearchParams.get('page');
        setPageNumber(page);
        setIsNextAvailable(true);
      } else {
        setPageNumber(1);
        setIsNextAvailable(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return [
    loading,
    refreshing,
    results,
    loading || refreshing ? () => null : getData,
    loading || refreshing ? () => null : refreshData,
    loading || refreshing ? () => null : newData,
  ];
};
