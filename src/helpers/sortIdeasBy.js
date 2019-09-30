export  const sortIdeasBy = (ideas, sortBy) => {
    switch(sortBy) {
        case "titleAZ":
            return ideas.sort((a,b)=> a["title"] > b["title"]? 1: (b["title"] > a["title"])?-1:0)
        case "titleZA":
            return ideas.sort((a,b)=> a["title"] > b["title"]? -1: (b["title"] > a["title"])?1:0)
        case "created_date_old":
            return ideas.sort((a,b)=> (new Date(a["created_date"])) > (new Date(b["created_date"]))? 1: (new Date(b["created_date"]) > (new Date(a["created_date"])))?-1:0)
        case "created_date_new":
            return ideas.sort((a,b)=> (new Date(a["created_date"])) > (new Date(b["created_date"]))? -1: (new Date(b["created_date"]) > (new Date(a["created_date"])))?1:0)
        default:
            return ideas.sort((a,b)=>a.id -b.id)
    }
}



