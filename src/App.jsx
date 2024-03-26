import './App.css'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'count', headerName: 'Count', flex: 1 },
];

function App() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [sortModel, setSortModel] = useState([{
    field: 'count',
    sort: 'desc',
  }]);

  const [pageInfo, setPageInfo] = useState({
    isLoading: false,
    rows: [],
    total: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setPageInfo(old => ({ ...old, isLoading: true }));
      
      const page = paginationModel.page + 1;
      const pageSize = paginationModel.pageSize;
      const order = sortModel[0].sort;
      const sortField = sortModel[0].field === 'count' ? 'popular' : sortModel[0].field;
      
      const currentPageResponse = await fetch(`https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sortField}&site=stackoverflow`)
      const currentPageItems = (await currentPageResponse.json()).items || [];
      currentPageItems.forEach((item) => {
        item.id = self.crypto.randomUUID();
      });

      const totalResponse = await fetch('https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total');
      const total = (await totalResponse.json()).total || 0;
      setPageInfo(old => ({ ...old, isLoading: false, rows: currentPageItems, total: total }));
    }
    fetchData();
  }, [paginationModel, sortModel])

  return (
    <>
      <h1>Tag browser</h1>
      <DataGrid
        autoHeight
        columns={columns}
        rows={pageInfo.rows}
        rowCount={pageInfo.total}
        loading={pageInfo.isLoading}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
      />
    </>
  )
}

export default App
