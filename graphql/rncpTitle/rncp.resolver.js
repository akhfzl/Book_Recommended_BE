async function rncpTitleTypeResolver(parent, args, context){
    if(parent.rncp_title){
        return await context.rncpTitleLoader.load(parent.rncp_title)
    }
}

module.exports = {
    Student: {
        rncp_title: rncpTitleTypeResolver
    }
}