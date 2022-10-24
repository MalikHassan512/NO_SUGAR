import {useState, useEffect} from 'react';

// import "url-search-params-polyfill";
import axios from 'axios';

export const usePaginator = dataSourceCallback => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [isNextAvailable, setIsNextAvailable] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  //const [request] = useNetworkRequest();

  const getData = async () => {
    if (isNextAvailable) {
      setLoading(true);
      try {
        const {results: _results, next: _next} = await dataSourceCallback({
          page: pageNumber,
        });

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

  const refreshData = async () => {
    try {
      setRefreshing(true);
      const {results: _results, next: _next} = await dataSourceCallback({
        page: 1,
      });
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
  ];
};
