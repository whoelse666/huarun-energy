import request from '@/utils/request'


/**
 * @name: 列表分页查询
 * @param {*} params
 * @return {*}
 */
export function findPageList(params) {
    return request({
        url: '/project/list-page',
        method: 'POST',
        data: params || {},
    })
}

/**
 * @function: deleteTableRow删除
 * @param {*} id
 * @return {*}
 */
export function deleteTableRow(id) {
    return request({
        url: `/project/${id}`,
        method: 'delete',
    })
}

/**
 * @function:addRequest新增
 * @param {*} params
 * @return {*}
 */
export function addRequest(params) {
    return request({
        url: '/project',
        method: 'POST',
        data: params || {},
    })
}

/**
 * @function:updateRequest更新
 * @param {*} params
 * @return {*}
 */
export function updateRequest(params) {
    return request({
        url: '/project',
        method: 'PUT',
        data: params || {},
    })
}


export function getProjectOptions(areaId) {
    let url = `/project/options`
    if (areaId) {
        url=`/project/options?areaId=${areaId}`
    }
    return request({
        url: url,
        method: 'GET',
    })
}


export function getProjectDeatil(projectId) {
    let url = `/project/overview`
    if (projectId) {
        url=`/project/overview/${projectId}`
    }
    return request({
        url: url,
        method: 'GET',
    })
}

export function getProjectDeviceCategory(projectId) {
    let url = `/project/statistic/device-category/${projectId}`
    return request({
        url: url,
        method: 'GET',
    })
}

export function getProjectAlarm(projectId) {
    let url = `/project/statistic/alarm/${projectId}`
    return request({
        url: url,
        method: 'GET',
    })
}


export function getProjectOpData(data) {
    let url = `/project/master-boiler/operation-data`
    return request({
        url: url,
        method: 'POST',
        data
    })
}



export function setProjectBg(data) {
    let url = `/project/update-image`
    return request({
        url: url,
        method: 'PUT',
        data
    })
}