import './App.css'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Tag name', flex: 1 },
  { field: 'count', headerName: 'Posts count', flex: 1 },
];

const defaultPageSize = 5;

function App() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: defaultPageSize,
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
      setPageInfo((old) => ({ ...old, isLoading: true }));
      
      const page = paginationModel.page + 1;
      const pageSize = paginationModel.pageSize;
      const order = sortModel[0]?.sort || 'desc';
      const sortField = !sortModel[0] || sortModel[0]?.field === 'count' ? 'popular' : sortModel[0]?.field;
      
      try {
        const [currentPageResponse, totalResponse] = await Promise.all([
          fetch(`https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sortField}&site=stackoverflow`),
          fetch('https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total')
        ]);

        if (currentPageResponse.ok && totalResponse.ok) {
          const currentPageItems = (await currentPageResponse.json()).items || [];
          const currentPageItemsWithIds = currentPageItems.map((item) => ({...item, id: item.name}));
          const total = (await totalResponse.json()).total || 0;
          setPageInfo((old) => ({ ...old, isLoading: false, rows: currentPageItemsWithIds, total: total }));
        } else {
          throw new Error()
        }
      } catch (error) {
          showNotification("Something went wrong while fetching tags. Try again later or contact with administrator.");
          setPageInfo((old) => ({ ...old, isLoading: false }));
      }
    }
    fetchData();
  }, [paginationModel, sortModel])

  return (
    <>
      <h1>Tag browser</h1>
      <div className='input'>
        <label htmlFor="page-size">Rows per page</label>
        <input 
          id='page-size' 
          min={1}
          max={25}
          name='page-size'
          onChange={(e) => {
            const value = parseInt(e.target.value);
            let pageSize = value;
            if (value > 25 || value < 0 || isNaN(value)) {
              pageSize = defaultPageSize;
              showNotification("Allowed number of rows per page ranges from 1 to 25");
            }
            setPaginationModel((old) => ({...old, pageSize: pageSize}))
          }}
          step={1}
          type="number" 
          defaultValue={defaultPageSize}
        />
      </div>
      <DataGrid
        autoHeight
        columns={columns}
        disableColumnFilter
        rows={pageInfo.rows}
        rowCount={pageInfo.total}
        loading={pageInfo.isLoading}
        pageSizeOptions={[defaultPageSize]}
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

function showNotification(message) {
  const notification = document.createElement('p');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => document.body.removeChild(notification), 5000);
}