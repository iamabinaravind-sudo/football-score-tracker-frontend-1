import axiosInstance from './axiosInstance';
export const getUsersAPI = () => 
    axiosInstance.get('/users');

export const registerAPI = (data) =>
     axiosInstance.post('/users', data);

export const getMatchesAPI = () =>
     axiosInstance.get('/matches');

export const addMatchAPI = (data) => 
    axiosInstance.post('/matches', data);

export const updateMatchAPI = (id,data) => 
    axiosInstance.patch(`/matches/${id}`,data);


export const deleteMatchAPI = (id) => 
    axiosInstance.delete(`/matches/${id}`);

export const getDownloadsAPI = () =>
     axiosInstance.get('/downloads');

export const addDownloadAPI = (data) => 
    axiosInstance.post('/downloads',data);

export const deleteDownloadAPI = (id) => 
    axiosInstance.delete(`/downloads/${id}`);