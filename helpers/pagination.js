module.exports = (objectPaginationInit, query, countItem) => {
    if(query.page){
        objectPaginationInit.currentPage = parseInt(query.page);
    }

    objectPaginationInit.skip = (objectPaginationInit.currentPage - 1) * objectPaginationInit.limitPage; //bỏ qua bao skip phần tử

    objectPaginationInit.totalPage = Math.ceil(countItem / objectPaginationInit.limitPage); // Tổng số trang
    
    return objectPaginationInit;
}