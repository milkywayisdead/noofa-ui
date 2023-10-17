const host = process.env.NOOFA_API_HOST ?? '127.0.0.1';
const port = process.env.NOOFA_API_PORT ?? 8000;
const url = `http://${host}:${port}`;
const prefix = `${url}/api/v1`;

const urls = {
    getProfile: `${prefix}/get_profile/`,
    profilesDetails: `${prefix}/profiles_details/`,
    createProfile: `${prefix}/create_profile/`,
    updateProfile: `${prefix}/update_profile/`,
    deleteProfile: `${prefix}/delete_profile/`,
    partialUpdate: `${prefix}/partial_update/`,
    partialDelete: `${prefix}/partial_delete/`,
    testConnection: `${prefix}/test_connection/`,
    getTablesList: `${prefix}/get_tables_list/`,
    getFieldsList: `${prefix}/get_fields_list/`,
    getDbStructure: `${prefix}/get_db_structure/`,
    getQueryData: `${prefix}/get_query_data/`,
    getDataframeData: `${prefix}/get_df_data/`,
    getTableData: `${prefix}/get_table_data/`,
    getFigureData: `${prefix}/get_figure_data/`,
    getValue: `${prefix}/get_value/`,
    getDocument: `${prefix}/get_document/`,
}

export default urls;