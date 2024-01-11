module.exports = (query) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng Hoạt Động",
            status: "inactive",
            class: ""
        }
    ];

    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);
        // console.log(index);
        filterStatus[index].class = "active";
    }
    else{
        filterStatus[0].class = "active";
    }
    return filterStatus;
}