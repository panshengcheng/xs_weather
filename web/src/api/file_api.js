import { request } from "../utils/request";
//文件上传 
export function fileupload(url, data) {
    return request({
        url,
        headers: { "Content-Type": "multipart/form-data" },
        method: 'POST',
        data: data
    });
}
//文件下载
export function downFile(url, data) {
    return request({
        url,
        headers: { "Content-Type": "application/json;charset=utf-8" },
        method: 'GET',
        data: data,
        responseType: 'blob'
    });
}
