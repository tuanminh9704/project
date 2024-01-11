module.exports = (query) => {
    const objectSearch = {
        keyword: "",
        regex: "",
    }
    if(query.keyword){
        const regex = new RegExp(query.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
}