import { DataGrid } from "@mui/x-data-grid";

export default {
    title: "DataGrid",
    component: DataGrid
}

const rows = [
    { id: "javascript", name: "javascript", count: 2528722 },
    { id: "python", name: "python", count: 2192025 },
    { id: "java", name: "java", count: 1917226 },
    { id: "c#", name: "c#", count: 1614922 },
    { id: "php", name: "php", count: 1464407 },
    { id: "android", name: "android", count: 1417170 },
    { id: "html", name: "html", count: 1187320 },
    { id: "jquery", name: "jquery", count: 1034843 },
    { id: "c++", name: "c++", count: 806693 },
    { id: "css", name: "css", count: 804184 },
]

const columns = [
    { field: 'name', headerName: 'Tag name', flex: 1 },
    { field: 'count', headerName: 'Posts count', flex: 1 },
];

export const Loading = () => <DataGrid 
    autoHeight    
    columns={columns} 
    disableColumnFilter
    loading={true} 
    rows={[]} 
/>;

export const Loaded = () => <DataGrid 
    autoHeight 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
/>;

export const SortDescByCount = () => <DataGrid 
    autoHeigh 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
    sortModel={[{
        field: 'count',
        sort: 'desc',
    }]} 
/>;

export const SortAscByCount = () => <DataGrid 
    autoHeigh 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
    sortModel={[{
        field: 'count',
        sort: 'asc',
    }]} 
/>;

export const SortDescByName = () => <DataGrid 
    autoHeigh 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
    sortModel={[{
        field: 'name',
        sort: 'desc',
    }]} 
/>;

export const SortAscByName = () => <DataGrid 
    autoHeigh 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
    sortModel={[{
        field: 'name',
        sort: 'asc',
    }]} 
/>;

export const PageSize5 = () => <DataGrid 
    autoHeigh 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
    paginationModel={{
        page: 0,
        pageSize: 5,
    }}
    pageSizeOptions={[5]}
/>;

export const HideNameColumn = () => <DataGrid 
    autoHeigh 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
    columnVisibilityModel={{
        name: false,
    }}
/>;

export const HideColumnCount = () => <DataGrid 
    autoHeigh 
    columns={columns} 
    disableColumnFilter
    rows={rows} 
    columnVisibilityModel={{
        count: false,
    }}
/>;