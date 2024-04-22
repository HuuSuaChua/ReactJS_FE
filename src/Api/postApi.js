import { axiosInstance } from "./axiosInstance";
export const postApi = {
    getAll(params) {
        var url = '/posts';
        return axiosInstance.get(url, { params })
    },
    get(id) {
        var url = `/posts/${id}`;
        return axiosInstance.get(url)
    },
    add(data) {
        var url = `/posts`;
        return axiosInstance.post(url, data)
    },
    update(id, data) {
        var url = `/posts/${id}`;
        return axiosInstance.put(url, data)
    },
    del(id) {
        var url = `/posts/${id}`;
        return axiosInstance.delete(url)
    }

}